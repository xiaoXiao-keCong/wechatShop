/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('mallCtrl',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
	$scope.toCart = function () {
		$location.path('cart');
	};
    $scope.toDetail = function () {
        $location.path('mall_goods_detail');
    };
}]);