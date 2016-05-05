/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('storeCtrl',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBaseUrl = 'http://photo.yueyishujia.com:8112';
    $scope.isList = false;
    $scope.switch = function () {
    	$scope.isList = !$scope.isList;
    };
    $scope.toDetail = function () {
        $location.path('store_detail');
    };
}]);