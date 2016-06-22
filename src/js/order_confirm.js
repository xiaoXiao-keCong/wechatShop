/**
 * Created by hugotan on 2016/5/27.
 * @brief 订单确认controller
 */
index.controller('orderConfirmCtrl',
	['$scope', '$http', '$location', '$routeParams', '$rootScope', '$timeout',
	function ($scope, $http, $location, $routeParams, $rootScope, $timeout) {

	$scope.goodsArr = $rootScope.goodsArr;
    $scope.numArr = $rootScope.numArr;
    var cartFlag = $rootScope.cartFlag;
    $scope.totalPrice = 0;
    // 默认取货方式为邮寄
    $scope.type = "address";

    // 初始化执行
	(function init() {
		setSite();
		getTotalPrice();
		getFreight();
		getCoupon();
	})();

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

	// 计算总价
	function getTotalPrice() {
		var totalPrice = 0;
		for (var i = 0; i < $scope.goodsArr.length; i++) {
			totalPrice += $scope.goodsArr[i].price * $scope.numArr[i];
		}
		$scope.totalPrice = totalPrice;
	}

	// 获取运费
	function getFreight() {
		$http.post('/shop/getfreightcharges.json', {paymoney: $scope.totalPrice}, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				$scope.freight = data.data.freightcharges;
			}
		})
		.error(function (data) {
			console.log(data);
		});
	}

	// 获取可用的优惠券
	function getCoupon() {
		$http.post('/user/mycouponwithprice.json',
			{price: $scope.totalPrice, type: 1}, postCfg)
		.success(function (data) {
			console.log(data);
			if (1 === data.code) {
				if (0 === data.data.couponlist.length) {
					$scope.couponInfo = '无可用优惠券';
				}
				else {
					$scope.couponInfo = '有' + data.data.couponlist.length + '张优惠券可用';
				}
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});

	}

	// 跳转到选择地址界面
	$scope.selectAddress = function (addr) {
		// $rootScope.preUrl = $location.url();
		if (addr) {
			$location.path('address').search({current_id: addr.id});
		}
		else {
			$location.path('address');
		}
		
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
		var goodsIdArr = [];
		for (var i = 0; i < $scope.goodsArr.length; i++) {
			goodsIdArr.push($scope.goodsArr[i].id);
		}
		var data = {
			goodsid: goodsIdArr,
			num: $scope.numArr,
			type: $scope.type,
			addressid: $scope.site.id || 0,
			cartflag: cartFlag,
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
					$location.path('pay_goods/' + data.data.id).replace();
				});
			}
		})
		.error(function (data) {
			alert('数据请求失败!请稍后再试！');
		});
	};

}]);