/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('fashionHairStyleCtrl',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
}]);