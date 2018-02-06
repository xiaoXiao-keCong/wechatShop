index.controller('buyvipCtrl',
	['$scope', '$http', '$location', '$rootScope', '$timeout', function ($scope, $http, $location, $rootScope, $timeout) {
	(function init() {
		// 请求用户信息
		$scope.orderid=0;
		var loading = weui.loading('加载中');
		$http.post('/vip/buyvip.json', postCfg)
		.success(function (resp) {
			// console.log(resp);
			if(resp.code == 1){
				$scope.orderid=resp.data.id;
				$scope.order=resp.data;
			}
			loading.hide();
		})
		.error(function (resp) {
			// alert('数据请求失败，请稍后再试！');
		});
	})();

	$scope.gobuy = function (){
		if($scope.orderid === 0){
			weui.alert('系统错误，请重新下单!', function () {
		    }, {
		        title: '温馨提示'
		    });
			return;
		}
		var predata = {
			type: 'wz',
			orderid: $scope.orderid
		};
		// console.log(predata);
		$http.post('/pay/prepay.json', predata, postCfg)
		.success(function (resp) {
			// console.log(resp);
			if (1 === resp.code) {
				// 预支付成功
				var data = resp.data;
				if (WeixinJSBridge) {
					WeixinJSBridge.invoke(
				       'getBrandWCPayRequest', {
				           "appId": data.appId,     //公众号名称，由商户传入     
				           "timeStamp": data.timeStamp.toString(),         //时间戳，自1970年以来的秒数     
				           "nonceStr": data.nonceStr, //随机串     
				           "package": data.package,     
				           "signType": data.signType,         //微信签名方式    
				           "paySign": data.paySign //微信签名 
				       },
				       function(res) {
				           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				               // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				               // alert('支付成功');
				               weui.toast('支付成功!', {
			                        duration: 1500,
			                        className: "bears"
			                    });
				               // 请求用户信息
								$http.post('/user/mine.json', postCfg)
								.success(function (resp) {
									if (1 === resp.code) {
										var user = resp.data;
										if(user.avatar === ''){
											user.avatar='../../assets/images/head-none.png';
										}else{
											user.avatar = picBasePath + user.avatar;
										}
										if(user.nickname === ''){
											user.nickname = '暂无昵称';
										}
										$scope.user = user;
						                sessionStorage.setItem('user', JSON.stringify(user));
									}

				               		$location.path('classification');
								})
								.error(function (resp) {
									// alert('数据请求失败，请稍后再试！');
								});
				           }
				           else {
				               // alert('支付失败' + res.err_msg);
				               weui.alert('支付失败!', function () {
							    }, {
							        title: '温馨提示'
							    });
				           }
				       }
				   );
				}
			}
			else if (0 === resp.code) {
				// alert(resp.reason);
				weui.alert(resp.reason, function () {
			    }, {
			        title: '温馨提示'
			    });
			}
		})
		.error(function (resp) {
			// alert('数据请求失败!请稍后再试！');
		});
	};
}]);