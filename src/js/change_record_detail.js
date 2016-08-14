/**
 * Created by hugotan on 2016/8/11.
 */
index.controller('changeRecordDetailCtrl',
	['$scope', '$http', '$location', '$window', '$q', '$rootScope',
	function ($scope, $http, $location, $window, $q, $rootScope) {
	
	$scope.deferred = $q.defer();

	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});

	(function init() {
		
	})();

}]);