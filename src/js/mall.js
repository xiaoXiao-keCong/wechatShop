/**
 * Created by hugotan on 2016/4/16.
 */
angular.module('mall', []).controller('mallCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
	$scope.toCart = function () {
		$window.location.href = 'cart.html';
	};
}]);