/**
 * Created by hugotan on 2016/5/2.
 */
angular.module('pointOrderConfirm', []).controller('pointOrderConfirmCtrl', ['$scope', '$http', function ($scope, $http) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
	
}]);