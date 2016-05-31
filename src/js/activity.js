/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('activityCtrl',
	['$scope', '$http', '$location', function ($scope, $http, $location) {
	// 获取所有活动
	$http.post('/activity/getallactivity.json', postCfg)
	.success(function (data) {
		console.log(data);
	})
	.error(function (resp) {
		console.log(resp);
	});
}]);