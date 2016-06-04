/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('activityCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	// 获取所有活动
	$http.post('/activity/getallactivity.json', postCfg)
	.success(function (data) {
		console.log(data);
		if (1 === data.code) {
			var activityList = data.data.activitylist;
			for (var i =0, j = activityList.length; i < j; i++) {
				activityList[i].imgurl = picBasePath + activityList[i].imgurl;
			}
			$scope.activityList = activityList;
		}
	})
	.error(function (resp) {
		console.log(resp);
	});

	$scope.jump = function (activity) {
		$window.location.href = activity.jumpurl;
	};
}]);