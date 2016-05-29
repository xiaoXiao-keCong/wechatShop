/**
 * Created by hugotan on 2016/5/27.
 * @brief 订单确认controller
 */
index.controller('orderConfirmCtrl',
	['$scope', '$http', '$location', '$routeParams', '$rootScope', '$timeout',
	function ($scope, $http, $location, $routeParams, $rootScope, $timeout) {
	var goodsId = $routeParams.goods_id;
    $scope.buyNum = $routeParams.buy_num;
    // 默认取货方式为邮寄
    $scope.type = "address";

	function init() {
		setSite();
		getGoods();
	}

	init();

	// 设置用户收货地址
	function setSite() {
		if (sessionStorage.getItem('site')) {
			$scope.hasSite = true;
			$scope.site = JSON.parse(sessionStorage.getItem('site'));
		}
		else {
			// 将地址设置为默认地址
		    $http.post('/user/myaddress.json', postCfg)
		    .then(function (resp) {
		    	if (-1 === resp.data.code) {
		    		// 用户未登录
		    		$rootScope.preUrl = $location.url();
		    		$location.path('login');
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
		    });
		}
	}

	// 通过商品id获取商品详情
	function getGoods() {
		$http.post('/shop/getgoodsbyid.json', {'id': goodsId}, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				var goods = resp.data.data;
				for (var i = 0, j = goods.imgarray.length; i < j; i++) {
					goods.imgarray[i].imgurl = picBasePath + goods.imgarray[i].imgurl;
				}
				
				if (sessionStorage.user) {
					var user = JSON.parse(sessionStorage.user);
					// 用户vip对象的id等于1为普通用户
					if (user.vip.id === 1) {
						// 普通用户，使用realprice
						goods.price = goods.realprice;
					}
					else {
						// vip用户，使用vipprice
						goods.price = goods.vipprice;
					}
				}
				$scope.goods = goods;
				$scope.totalPrice = parseFloat(goods.price) * parseInt($scope.buyNum);
				getFreight();
			}
		}, function (resp) {
			console.log(resp);
		});
	}

	// 获取运费
	function getFreight() {
		$http.post('/integralshop/getfreightcharges.json', {paymoney: $scope.totalPrice}, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				$scope.freight = data.data.freightcharges;
			}
		})
		.error(function (data) {
			console.log(data);
		});
	}

	// 跳转到选择地址界面
	$scope.selectAddress = function (addr) {
		// $rootScope.preUrl = $location.url();
		$location.path('address').search({current_id: addr.id});
	};

	// 选择收货方式
	$scope.chooseReceiveType = function (typeIndex) {
		switch (typeIndex) {
			case 1:
				// 
			    $scope.type = "address";
			    break;
			case 2:
				$scope.type = 'score';
				break;
		}
	};

	$scope.selectCoupon = function () {
		$location.path('coupon');
	};

	// 提交订单事件
	$scope.orderConfirm = function () {
		var data = {
			goodsid: [parseInt(goodsId)],
			num: [$scope.buyNum],
			type: $scope.type,
			addressid: $scope.site.id || 0,
			cartflag: 0,
			couponid: parseInt($scope.couponId) || 0,
			remark: $scope.remark,
			freightcharges: parseFloat($scope.freight)
		};
		$http.post('/user/confirmorder.json', data, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
			}

			else if (1 === data.code) {
				// 下单成功
				$timeout(function () {
					alert('下单成功！');
					// 应该跳转到支付页面
					$location.path('pay_goods/' + data.data.id);
				});
			}
		})
		.error(function (data) {
			alert('数据请求失败!请稍后再试！');
		});
	};

}]);