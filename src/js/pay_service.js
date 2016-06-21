/**
 * Created by hugotan on 2016/4/23.
 */
// 商品支付控制器
index.controller('payServiceCtrl',
	['$scope', '$http','$location', '$routeParams',
	function ($scope, $http, $location, $routeParams) {

	// 获取订单id
	var orderId = $routeParams.order_id;
	$scope.service = JSON.parse($location.search().service);
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
	};
}]);