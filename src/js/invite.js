/**
 * Created by hugotan on 2016/8/7.
 */
index.controller('inviteCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	// 获取邀请码
	$http.post('/invite/getcode.json', postCfg)
	.success(function (resp) {
		if (1 === resp.code) {
			$scope.recNum = resp.data.recnum;
			$scope.recCode = resp.data.reccode;
		}
	})
	.error(function (resp) {
		alert('数据请求失败，请稍后再试！');
	});

	$scope.invite = function () {
		console.log('invite is trigger');
	};
}]);