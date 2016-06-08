/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('stylistCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

	// 获取发型师列表
	$http.post('/designer/list.json', {'page': 1}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var starUrl1 = '../../assets/images/star_h.png',
	            starUrl2 = '../../assets/images/star.png';
			var designerList = resp.data.data.designerlist;
			for (var i = 0; i < designerList.length; i++) {
				designerList[i].starUrl = [];
				designerList[i].avatar = picBasePath + designerList[i].avatar;
				designerList[i].imgurl = picBasePath + designerList[i].imgurl;
				for (var j = 0; j < designerList[i].score; j++) {
                    designerList[i].starUrl.push({'path': starUrl1});
                }
                for (var k = j; k < 5; k++) {
                    designerList[i].starUrl.push({'path': starUrl2});
                }
			}
			$scope.designerList = designerList;
			console.log($scope.designerList);
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

	$scope.toDetail = function (designer) {
		$location.path('stylist_detail/' + designer.id);
	};
}]);