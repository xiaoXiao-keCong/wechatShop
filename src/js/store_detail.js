/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('storeDetailCtrl', ['$scope', '$http', function ($scope, $http) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBaseUrl = 'http://photo.yueyishujia.com:8112';
}]);