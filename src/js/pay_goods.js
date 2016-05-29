/**
 * Created by hugotan on 2016/4/23.
 */
// 商品支付控制器
index.controller('payGoodsCtrl',
	['$scope', '$http','$location', '$routeParams',
	function ($scope, $http, $location, $routeParams) {

	// 获取订单id
	var orderId = $routeParams.order_id;
	// 默认选中余额支付
	$scope.balancePay = true;

	$http.post('/user/goodsorderdetail.json', {id: orderId}, postCfg)
	.success(function (data) {
		if (-1 === data.code) {
			$location.path('login');
		}
		else if (1 === data.code) {
			$scope.orderInfo = data.data;
			console.log($scope.orderInfo);
		}
	})
	.error(function (data) {
		alert('数据请求失败，请稍后再试！');
		console.log(data);
	});

	// 选择余额支付
	$scope.chooseBalance = function (index) {
		$scope.balancePay = (index === 1) ? true : false;
	};

}]);