/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('designerSearchCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	// 首页搜索
	$scope.search = function () {
		var data = {
			kind: 'designer',
			q: $scope.word,
			page: 1,
			// areaid: 
		};
		$http.post('/home/search.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (1 === data.code) {
				var designerList = data.data.designerlist,
				    goodsList = data.data.goodslist,
				    storeList = data.data.storelist,
				    starUrl1 = '../../assets/images/star_h.png',
		            starUrl2 = '../../assets/images/star.png';
		        // 处理发型师数据
				for (var i = 0; i < designerList.length; i++) {
					designerList[i].starUrl = [];
					designerList[i].avatar = picBasePath + designerList[i].avatar;
					for (var j = 0; j < designerList[i].score; j++) {
	                    designerList[i].starUrl.push({'path': starUrl1});
	                }
	                for (var k = j; k < 5; k++) {
	                    designerList[i].starUrl.push({'path': starUrl2});
	                }
				}
				$scope.designerList = designerList;
			}
		})
		.error(function (data) {
			console.log(data);
		});
	};

	// 跳转到设计师详情
	$scope.toDesignerDetail = function (designer) {
		$location.path('stylist_detail/' + designer.id);
	};
}]);