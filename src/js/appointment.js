/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('appointmentCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
	$scope.itemSelect = function () {

	};
	$scope.recommend = function () {
		$scope.showMask = true;
	};
	
	$scope.jump = function () {
		$scope.showMask = true;
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