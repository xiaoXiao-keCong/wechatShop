/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('goPayCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	// 获取项目列表
	$http.post('/user/payorder.json', postCfg)
	.success(function (data) {
		console.log(data);
	})
	.error(function (data) {
		alert('数据请求失败，请稍后再试！');
	});

}]);