/**
 * Created by hugotan on 2016/5/2.
 */
index.controller('pointOrderConfirmCtrl',
	['$scope', '$http', '$location', function ($scope, $http, $location) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
	$scope.orderConfirm = function () {
		$location.path('change_tip');
	};
}]);