/**
 * Created by hugotan on 2016/5/2.
 */
index.controller('pointOrderConfirmCtrl',
	['$scope', '$http', '$location', function ($scope, $http, $location) {
	
	$scope.orderConfirm = function () {
		$location.path('change_tip');
	};
}]);