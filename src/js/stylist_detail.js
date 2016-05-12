/**
 * Created by hugotan on 2016/4/30.
 */
index.controller('stylistDetailCtrl', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {

	$scope.project = true;
	$scope.show = function (index) {
		$scope.project = (1 === index ? true : false);
		$scope.price = (2 === index ? true : false);
		$scope.life = (3 === index ? true :false);
		$scope.work = (4 === index ? true : false);
	};

	// 获取发型师详情
	$http.post('/designer/info.json', {'designerid': $routeParams.id}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var designer = resp.data.data;
			// 暂时添加图片url前缀
			$scope.designer = designer;
		}
	}, function (resp) {
		console.log(resp);
	});

	// 发型师项目
	$http.post('/designer/service.json', postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var serviceList = resp.data.data.servicelist;
			for (var i = 0, j = serviceList.length; i < j; i++) {
				serviceList[i].serviceTime = serviceList[i].length * 30;
				serviceList[i].selected = false;
			}
			$scope.serviceList = serviceList;
			// 计算总的服务时间
			$scope.totalServiceTime = function () {
				var totalTime = 0;
				for (var i = 0, j = $scope.serviceList.length; i < j; i++) {
					if ($scope.serviceList[i].selected === true) {
						totalTime += $scope.serviceList[i].serviceTime;
					}
				}
				return totalTime;
			};
		}
	}, function (resp) {
		console.log(resp);
	});

	// 选择发型师项目
	$scope.selectService = function (service) {
		service.selected = !service.selected;
	};

	// $scope.totalServiceTime = function () {
	// 	var totalTime = 0;
	// 	for (var i = 0, j = $scope.serviceList.length; i < j; i++) {
	// 		if ($scope.serviceList[i].selected === true) {
	// 			totalTime += $scope.serviceList[i].serviceTime;
	// 		}
	// 	}
	// 	return totalTime;
	// };
}]);
