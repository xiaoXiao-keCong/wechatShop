/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('balanceCtrl', ['$scope', '$http', function ($scope, $http) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBaseUrl = 'http://photo.yueyishujia.com:8112';
	var cartPromise = $http.post('/user/mybalancerecord.json', postCfg);
	cartPromise.then(function (resp) {
		var data = resp.data;
		console.log(data);
		if (1 === data.code && 0 < data.data.balancelist.length) {
			$scope.balanceList = data.data.balancelist;
		}
	}, function (resp) {
		console.log(resp);
	});
}]);