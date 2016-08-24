/**
 * Created by hugotan on 2016/4/23.
 */
// 商品支付控制器
index.controller('payGoodsCtrl',
	['$scope', '$http','$location', '$routeParams',
	function ($scope, $http, $location, $routeParams) {

	// 获取来源，包括悦商城和积分商城两种来源
	var origin = $location.search().origin || '';
	// 获取订单id
	var orderId = $routeParams.order_id;
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
		// 获取订单详情
		$http.post('/user/goodsorderdetail.json', {id: orderId}, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				$scope.orderInfo = data.data;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	})();

	// 选择余额支付
	$scope.chooseBalance = function (index) {
		$scope.balancePay = (index === 1) ? true : false;
	};

	// 点击立即支付弹出输入密码对话框
	$scope.pay = function () {
		$scope.showMask = true;
		// 微信支付
		// var data = {
		// 	orderid: orderId,
		// 	channel: 'wx_pub',
		// 	code: sessionStorage.getItem('wxCode')
		// };
		// $http.post('/pay/getpingcharge.json', data, postCfg)
		// .success(function (resp) {
		// 	console.log(resp);
		// 	if (1 === resp.code) {
		// 		pingpp.createPayment(JSON.stringify(resp.data), function (result, err) {
		// 			console.log(result, err);
		// 		});
		// 	}
		// })
		// .error(function (resp) {
		// 	alert('数据请求失败，请稍后再试！');
		// });
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
			if (-1 === data.code) {
				$location.path('login');
				return;
			}
			if (1 === data.code) {
				alert('支付成功！');
				$location.path('order').search({});
				// 跳转到支付成功界面
				$location.path('change_tip').search({type: 'pay', orderId: orderId, origin: origin}).replace();
			}
			else {
				alert(data.reason);
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};
}]);