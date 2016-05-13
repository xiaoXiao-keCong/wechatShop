/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('stylistCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

	// 获取发型师列表
	$http.post('/designer/list.json', {'page': 1}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var designerList = resp.data.data.designerlist;
			for (var i = 0, j = designerList.length; i < j; i++) {
				designerList[i].imgurl = picBasePath + designerList[i].imgurl;
			}
			$scope.designerList = designerList;
		}
	}, function (resp) {
		console.log(resp);
	});
	$scope.switch = function () {
		$scope.isList = !$scope.isList;
	};
	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				$location.path('/');
				break;
			case 2:
				$location.path('stylist');
				break;
			case 3:
				$location.path('appointment');
				break;
			case 4:
				$location.path('order');
				break;
			case 5:
				$location.path('my');
				break;
		}
	};

	$scope.toStylistDetail = function () {
		$window.location.href = 'stylist_detail.html';
	};
	$scope.toDetail = function (designer) {
		console.log(designer);
		$location.path('stylist_detail/' + designer.id);
	};
}]);