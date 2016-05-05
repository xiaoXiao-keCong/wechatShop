/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('orderCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
		var titles = ['我的预约', '服务记录', '商城订单'];
	$scope.title = '我的预约';
	$scope.isAppointOrder = true;
	$scope.isServiceOrder = false;
	$scope.isMallOrder = false;
	$scope.orderNav = function (index) {
		$scope.isAppointOrder = (1 === index ? true : false);
		$scope.isServiceOrder = (2 === index ? true : false);
		$scope.isMallOrder = (3 === index ? true: false);
		$scope.title = titles[index - 1];
		$scope.showMask = false;
	};

	$scope.toPay = function () {
		$location.path('pay_goods');
	};
	$scope.toDetail = function () {
		$location.path('order_detail');
	};
	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				$location.path('/');
				break;
			case 2:
				$location.path('stylist');
				break;
			case 3:
				$location.path('appointment');
				break;
			case 4:
				$location.path('order');
				break;
			case 5:
				$location.path('my');
				break;
		}
	};
}]);