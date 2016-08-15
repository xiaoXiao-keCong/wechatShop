/**
 * Created by hugotan on 2016/8/11.
 */
index.controller('changeRecordDetailCtrl',
	['$scope', '$http', '$location', '$window', '$q', '$rootScope', '$routeParams',
	function ($scope, $http, $location, $window, $q, $rootScope, $routeParams) {
	
	$scope.deferred = $q.defer();
	$scope.id = $routeParams.id;

	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});

	(function init() {
		
	})();

}]);