/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('balanceCtrl', ['$scope', '$http', function ($scope, $http) {
	var cartPromise = $http.post('/user/mybalancerecord.json', postCfg);
	cartPromise.then(function (resp) {
		var data = resp.data;
		if (1 === data.code) {
			$scope.balance = data.data.balance;
			$scope.balanceList = data.data.balancelist;
		}
	}, function (resp) {
		console.log(resp);
	});
}]);