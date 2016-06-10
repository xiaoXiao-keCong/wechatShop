/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('stylistCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

	var isGetStoreInfo = false;

	// 获取发型师列表
	function getDesignerInfo(data) {
		$http.post('/designer/list.json', data, postCfg)
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
			}
		}, function (resp) {
			console.log(resp);
		});
	}
	
	getDesignerInfo({page: 1});


	// 显示方式切换
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

	// 进入发型师搜索界面
	$scope.searchDesigner = function () {
		$location.path('designer_search');
	};

	// 获取门店列表信息用作筛选
	$scope.getStoreInfo = function () {
		$scope.showStore = !$scope.showStore;
		$scope.showMask = !$scope.showMask;
		if (!isGetStoreInfo) {
			$http.post('/store/all.json', postCfg)
			.success(function (data) {
				console.log(data);
				if (1 === data.code) {
					var areaList = data.data.arealist;
					$scope.areaList = areaList;
					isGetStoreInfo = true;
				}
			})
			.error(function (data) {
				console.log(data);
			});
		}
		
	};

	// 选择区域
	$scope.selectCity = function (area, e) {
		e.stopPropagation();
		var index = $scope.areaList.indexOf(area);
		if (index !== -1 && $scope.areaList[index].citySelected !== true) {
			console.log(area);
			for (var i = 0; i < $scope.areaList.length; i++) {
				$scope.areaList[i].citySelected = false;
			}
			$scope.areaList[index].citySelected = true;
		}
	};

	// 选择门店
	$scope.selectStore = function (store, e) {
		e.stopPropagation();
		if (!store.selected) {
			for (var i = 0; i < $scope.areaList.length; i++) {
				for (var j = 0; j < $scope.areaList[i].storelist.length; j++) {
					$scope.areaList[i].storelist[j].selected = false;
				}
			}
			store.selected = true;
			$scope.storeId = store.id;
			var data = {
				page: 1,
				storeid: $scope.storeId,
				sort: $scope.sort || 'default'
			};
			getDesignerInfo(data);
			$scope.showStore = false;
			$scope.showMask = false;
		}
	};

	// 自助筛选
	$scope.filter = function (type) {
		$scope.filterShow = !$scope.filterShow;
		$scope.filterDefault = (type === 'default') ? true : false;
		$scope.filterMostReserve = (type === 'mostreserve') ? true : false;
		$scope.filterHighestScore = (type === 'highestscore') ? true : false;
		$scope.filterNearest = (type === 'nearest') ? true : false;
		$scope.filterCheapest = (type === 'cheapest') ? true : false;
		$scope.filterExpensive = (type === 'expensive') ? true : false;
		if ($scope.type !== type) {
			var data = {
				page: 1,
				storeid: $scope.storeId,
				sort: $scope.sort || 'default'
			};
			getDesignerInfo(data);
		}
	};
}]);