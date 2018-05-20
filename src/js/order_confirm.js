index.controller('orderConfirmCtrl',
	['$scope', '$http', '$location', '$routeParams', '$rootScope', '$timeout',
	function ($scope, $http, $location, $routeParams, $rootScope, $timeout) {
	$scope.user = JSON.parse(sessionStorage.getItem('user'));
	$scope.goodsArr = $rootScope.goodsArr;
	console.log($scope.goodsArr);
    $scope.numArr = $rootScope.numArr;
    console.log($scope.numArr);
    $scope.colorArr = $rootScope.colorArr;
    $scope.sizeArr = $rootScope.sizeArr;
    var cartFlag = $rootScope.cartFlag;
    $scope.totalPrice = 0;
    // 默认取货方式为邮寄
    $scope.type = "address";
    // 初始化执行
	(function init() {
		setSite();
		getFreight();
		getTotalPrice();
		getCoupon();
	})();

	// 设置用户收货地址
	function setSite() {
		if (sessionStorage.getItem('site')) {
			$scope.hasSite = true;
			$scope.site = JSON.parse(sessionStorage.getItem('site'));
		}
		else {
			var loading = weui.loading('加载中');
			// 将地址设置为默认地址
		    $http.post('/user/myaddress.json', postCfg)
		    .then(function (resp) {
		    	if (-1 === resp.data.code) {
		    		// 用户未登录
		    		$location.path('fast_login').search({});
		    	}
		    	else if (1 === resp.data.code) {
		    		// 获取默认收货地址
		    		var siteArr = resp.data.data.addresslist;
		    		for (var i = 0, j = siteArr.length; i < j; i++) {
		    			if (1 === siteArr[i].defaultflag) {
		    				$scope.hasSite = true;
		    				$scope.site = siteArr[i];
		    				break;
		    			}
		    		}
		    	}
		    	loading.hide();
		    });
		}
	}

	// 计算总价
	function getTotalPrice() {
		var totalPrice = 0;
		for (var j = 0; j < $scope.goodsArr.length; j++) {
			if($scope.goodsArr.type == 1){
				totalPrice += $scope.goodsArr[j].realprice * $scope.numArr[j];
			}else{
				if($scope.user.vipflag==1){//是会员
					totalPrice += $scope.goodsArr[j].vipprice * $scope.numArr[j];
				}else{
					totalPrice += $scope.goodsArr[j].originalprice * $scope.numArr[j];

				}
			}
			
		}
		
		$scope.totalPrice = totalPrice;
	}

	// 获取运费
	function getFreight() {
		$http.post('/order/expresscost.json', postCfg)
		.success(function (data) {
			if (1 === data.code) {
				$scope.freight = data.data.goodsorderList;
				$scope.expresscostid=data.data.goodsorderList[0].id;
			}
		})
		.error(function (data) {
			// alert('数据请求失败，请稍后再试！');
		});
	}

	// 获取可用的优惠券
	function getCoupon() {
		if (!$rootScope.selectedCoupon) {
			var loading = weui.loading('加载中');
			var goodsIdArr = [];
			for (var i = 0; i < $scope.goodsArr.length; i++) {
				goodsIdArr.push($scope.goodsArr[i].id);
			}
			$http.post('/user/couponcanusewithorder.json',
				{goodsid: goodsIdArr, num : $scope.numArr}, postCfg)
			.success(function (data) {
				if (1 === data.code) {
					// console.log(data);
					if (0 === data.data.couponlist.length) {
						$scope.noUsefulCoupon = true;
						$scope.couponInfo = '无可用优惠券';
					}
					else {
						$scope.couponInfo = '有' + data.data.couponlist.length + '张优惠券可用';
					}
				}
				loading.hide();
			})
			.error(function (data) {
				// console.log(data);
				// alert('数据请求失败，请稍后再试！');
			});
		}
		else {
			var coupon = $rootScope.selectedCoupon;
			$scope.couponInfo = coupon.rule;
			$scope.couponId = coupon.id;
		}
	}

	// 跳转到选择地址界面
	$scope.selectAddress = function (addr) {
		// $rootScope.preUrl = $location.url();
		if (addr) {
			$location.path('address').search({current_id: addr.id});
		}
		else {
			$location.path('address').search({});
		}
		
	};
	// 选择快递
	$scope.changeExpresscost = function (index){
		$scope.expresscostid = index.id;
		getTotalPrice();
	};

	$scope.selectCoupon = function () {
		if ($scope.noUsefulCoupon === true) {
			return;
		}
		var goodsIdArr = [];
		for (var i = 0; i < $scope.goodsArr.length; i++) {
			goodsIdArr.push($scope.goodsArr[i].id);
		}
		$location.path('select_coupon').search({goodsid: goodsIdArr, num: $scope.numArr});
	};

	// 提交订单事件
	$scope.orderConfirm = function () {
		var goodsIdArr = [], addressId;
		for (var i = 0; i < $scope.goodsArr.length; i++) {
			goodsIdArr.push($scope.goodsArr[i].id);
		}
		switch ($scope.type) {
			case 'address':
				if (!$scope.site || !$scope.site.id) {
					// alert('请选择收货地址！');
					weui.alert('请选择收货地址！', function () {
				    }, {
				        title: '温馨提示'
				    });
					return;
				}
				addressId = $scope.site.id;
			    break;
			case 'store':
			    if (!$scope.selectedStore || !$scope.selectedStore.id) {
			    	// alert('请选择自取门店！');
			    	weui.alert('请选择自取门店！', function () {
				    }, {
				        title: '温馨提示'
				    });
			    	return;
			    }
			    addressId = $scope.selectedStore.id;
			    break;
		}
		var data = {
			goodsid: goodsIdArr,
			num: $scope.numArr,
			colorid: $scope.colorArr,
			sizeid: $scope.sizeArr,
			addressid: addressId,
			cartflag: cartFlag,
			couponid: parseInt($scope.couponId) || 0,
			remark: $scope.remark,
			expresscostid: $scope.expresscostid
		};
		$http.post('/order/generateorder.json', data, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('fast_login').search({});
			}

			else if (1 === data.code) {
				// 下单成功
				// console.log(data);
				var predata = {
					type: 'wz',
					orderid: data.data.id
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
						               $rootScope.activeTab = 3;
						               $location.path('order');
						           }
						           else {
						               // alert('支付失败' + res.err_msg);
						               weui.alert('支付失败，请稍后重试', function () {
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
			}
			else if (0 === data.code) {
				alert(data.reason);
			}
		})
		.error(function (data) {
			// alert('数据请求失败!请稍后再试！');
		});
	};

	$scope.selectStore = function () {
		$location.path('select_store').search({from: 'order_confirm'});
	};

}]);