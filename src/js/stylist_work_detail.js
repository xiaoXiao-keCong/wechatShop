/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('stylistWorkDetailCtrl',
	['$scope', '$http', '$location', '$window', '$routeParams',
	function ($scope, $http, $location, $window, $routeParams) {
	

	var workId = $routeParams.id;
	$scope.page = 1;
	$scope.workPicList = [];

	(function init() {
		var data = {
			designerworkid: workId,
			page: $scope.page
		};
		// 获取发型师作品列表
		$http.post('/designer/workpic.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (1 === data.code) {
				var workPicList = data.data.designerworkpiclist;
				for (var i = 0; i < workPicList.length; i++) {
					workPicList[i].imgurl = picBasePath + workPicList[i].imgurl;
					$scope.workPicList.push(workPicList[i]);
				}

			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	})();
	

}]);