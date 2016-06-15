/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('goPayCtrl',
	['$scope', '$http', '$location', '$window', '$rootScope',
	function ($scope, $http, $location, $window, $rootScope) {
	
	var hasDesigner = false;

	(function init() {
		if ($rootScope.designer) {
			$scope.designer = $rootScope.designer;
			$scope.designerName = $scope.designer.name;
			hasDesigner = true;
		}
		else {
			$scope.designerName = '请选择';
		}
		// 获取项目列表
		$http.post('/user/payorder.json', postCfg)
		.success(function (data) {
			if (1 === data.code) {
				var serviceList = data.data.serviceonelist;
				for (var i = 0; i < serviceList.length; i++) {
					serviceList[i].imgurl = picBasePath + '/' + serviceList[i].imgurl;
					serviceList[i].disableimgurl = picBasePath + serviceList[i].disableimgurl;
					serviceList[i].clickimgurl = picBasePath + serviceList[i].clickimgurl;
				}
				$scope.serviceList = serviceList;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	})();
	

	$scope.selectStore = function () {
		$location.path('select_store');
	};

}]);