/**
 * Created by hugotan on 2016/4/23.
 */
// 充值支付控制器
index.controller('payRechargeCtrl',['$scope', '$http', '$location',
	function ($scope, $http, $location) {
	
	var order = $location.search();
	$scope.id = order.id;
	$scope.recommendBy = order.recommendBy;
	$scope.time = order.time;
	$scope.price = order.price;

	

}]);