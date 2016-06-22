/**
 * Created by hugotan on 2016/4/23.
 */
// 商品支付控制器
index.controller('payServiceCtrl',
	['$scope', '$http','$location', '$routeParams', '$rootScope',
	function ($scope, $http, $location, $routeParams, $rootScope) {

	// 获取订单id
	
	$scope.service = JSON.parse($location.search().service);
	var orderId = $scope.service.id;
	// 默认选中余额支付
	$scope.balancePay = true;

	(function init() {
		// 获取用户当前余额
		$http.post('/user/getcurrentbalance.json', postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
				return;
			}
			if (1 === data.code) {
				$scope.balance = data.data.balance;
			}
		});
		// 判断用户是否选择了优惠券
		getCoupon();
	})();

	// 选择余额支付
	$scope.chooseBalance = function (index) {
		$scope.balancePay = (index === 1) ? true : false;
	};

	// 点击立即支付弹出输入密码对话框
	$scope.pay = function () {
		$scope.showMask = true;
	};

	// 点击空白处隐藏遮罩并清除密码
	$scope.hideMask = function () {
		$scope.showMask = false;
		$scope.payPassword = '';
	};


	$scope.payClick = function (e) {
		e.stopPropagation();
	};

	// 忘记支付密码
	$scope.forgetPwd = function () {
		$location.path('forget_pwd').search({type: 'pay'});
	};

	// 确认支付
	$scope.confirmPwd = function () {
		if (!$scope.noUsefulCoupon) {
			// payPassword = $('#pay-password').val();
			// data = {
			// 	orderid: orderId,
			// 	paypassword: payPassword
			// };
			// $http.post('/pay/paywithbalance.json', data, postCfg)
			// .success(function (data) {
			// 	console.log(data);
			// 	if (0 === data.code) {
			// 		alert(data.reason);
			// 	}
			// 	else if (1 === data.code) {
			// 		alert('支付成功！');
			// 		// 跳转到支付成功界面
			// 		$location.path('change_tip').search({type: 'pay', orderId: orderId}).replace();
			// 	}
			// })
			// .error(function (data) {
			// 	alert('数据请求失败，请稍后再试！');
			// });
			payByBalance();
		}
		else {
			// 选择了优惠券
			var data = {
				orderid: orderId,
				couponid: parseInt($scope.couponId)
			};
			$http.post('/user/confirmconsumerorder.json', data, postCfg)
			.success(function (data) {
				console.log(data);
				if (1 === data.code && 1 === data.data.stateflag) {
					payByBalance();
				}
				else {
					alert('支付失败！');
					return;
				}
			});
		}
		
	};

	function payByBalance() {
		var payPassword = $('#pay-password').val();
		var data = {
			orderid: orderId,
			paypassword: payPassword
		};
		$http.post('/pay/paywithbalance.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (0 === data.code) {
				alert(data.reason);
			}
			else if (1 === data.code) {
				alert('支付成功！');
				// 跳转到支付成功界面
				$location.path('change_tip').search({type: 'pay', orderId: orderId}).replace();
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	}

	// 去选择优惠券
	// 获取可用的优惠券
	function getCoupon() {
		if (!$rootScope.serviceCoupon) {
			$http.post('/user/mycouponwithprice.json',
				{price: parseFloat($scope.service.actualprice), type: 2}, postCfg)
			.success(function (data) {
				if (1 === data.code) {
					if (0 === data.data.couponlist.length) {
						$scope.couponInfo = '无可用优惠券';
						$scope.noUsefulCoupon = true;
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
		else {
			var coupon = $rootScope.serviceCoupon;
			$scope.couponInfo = coupon.rule;
			$scope.couponId = coupon.id;
		}
	}

	$scope.selectCoupon = function () {
		if ($scope.noUsefulCoupon === true) {
			return;
		}
		$location.path('select_coupon').search({price: parseFloat($scope.service.actualprice), type: 2});
	};

}]);