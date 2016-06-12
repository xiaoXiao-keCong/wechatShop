/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('stylistCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

	var isGetStoreInfo = false;
	var isGetActivity = false;
	$scope.vh = [];
	$scope.nu = [];
	$scope.designerList = [];
	$scope.page = 1;
	$scope.isSelfFilter = false;


	// 获取发型师列表
	function getDesignerInfo () {
		var data;
		if ($scope.loading) {
			return;
		}
		$scope.loading = true;
		if (!$scope.isSelfFilter) {
			data = {
				page: $scope.page,
				sort: $scope.sort,
				positionx: $scope.positionX,
				positiony: $scope.positionY,
				storeid: $scope.storeId
			};
			$http.post('/designer/list.json', data, postCfg)
			.then(function (resp) {
				if (1 === resp.data.code) {
					var starUrl1 = '../../assets/images/star_h.png',
			            starUrl2 = '../../assets/images/star.png';
					var designerList = resp.data.data.designerlist;
					if (designerList.length > 0) {
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
			                $scope.designerList.push(designerList[i]);
						}
						$scope.loading = false;
						$scope.page += 1;
					}
					else {
						$scope.loaded = true;
					}
				}
			}, function (resp) {
				console.log(resp);
			});
		}
		else {
			data = {
				page: $scope.page,
				storetype: $scope.storeType,
				vh: $scope.vh,
				nu: $scope.nu
			};
			$http.post('/designer/searchbystoreandactivity.json', data, postCfg)
			.success(function (data) {
				console.log(data);
				var starUrl1 = '../../assets/images/star_h.png',
		            starUrl2 = '../../assets/images/star.png';
				var designerList = data.data.designerlist;
				if (designerList.length > 0) {
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
		                $scope.designerList.push(designerList[i]);
		                
					}
					$scope.loading = false;
	                $scope.page += 1;
				}
				else {
					$scope.loaded = true;
				}
				
			})
			.error(function (data) {
				console.log(data);
				alert('数据请求失败，请稍后再试！');
			});
		}
	}

	$scope.getDesignerInfo = getDesignerInfo;
	


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
		$scope.showMask = $scope.showStore ? true : false;
		$scope.filterShow = false;
		$scope.isShowSort = false;
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
		$scope.isSelfFilter = false;
		if (!store.selected) {
			for (var i = 0; i < $scope.areaList.length; i++) {
				for (var j = 0; j < $scope.areaList[i].storelist.length; j++) {
					$scope.areaList[i].storelist[j].selected = false;
				}
			}
			store.selected = true;
			$scope.storeId = store.id;
			$scope.designerList = [];
			$scope.page = 1;
			$scope.loading = false;
			$scope.loaded = false;
			getDesignerInfo();
			$scope.showStore = false;
			$scope.showMask = false;
		}
	};

	// 显示自助筛选的条目
	$scope.showFilterItems = function () {
		$scope.filterShow = !$scope.filterShow;
		$scope.showMask = $scope.filterShow ? true : false;
		$scope.showStore = false;
		$scope.isShowSort = false;
	};

	// 自助筛选
	$scope.filter = function (type, e) {
		e.stopPropagation();
		$scope.isSelfFilter = false;
		$scope.filterShow = false;
		$scope.showMask = false;
		$scope.filterDefault = (type === 'default') ? true : false;
		$scope.filterMostReserve = (type === 'mostreserve') ? true : false;
		$scope.filterHighestScore = (type === 'highestscore') ? true : false;
		$scope.filterNearest = (type === 'nearest') ? true : false;
		$scope.filterCheapest = (type === 'cheapest') ? true : false;
		$scope.filterExpensive = (type === 'expensive') ? true : false;
		if ($scope.sort !== type) {
			$scope.designerList = [];
			$scope.page = 1;
			$scope.loading = false;
			$scope.loaded = false;
			$scope.sort = type;
			getDesignerInfo();
		}
	};

	$scope.showSort = function () {
		$scope.isShowSort = !$scope.isShowSort;
		$scope.showMask = $scope.isShowSort ? true : false;
		$scope.filterShow = false;
		$scope.showStore = false;
		// 获取优惠活动和新用户专享数据
		if (!isGetActivity) {
			// 获取优惠活动
			$http.post('/designer/getactivityofyouhui.json', postCfg)
			.success(function (data) {
				console.log(data);
				if (1 === data.code) {
					$scope.couponActivity = data.data.activitylist;
					console.log($scope.couponActivity);
				}
			})
			.error(function (data) {
				console.log(data);
				alert('数据请求失败，请稍后再试！');
			});
			// 获取新用户活动
			$http.post('/designer/getactivityofnewuser.json', postCfg)
			.success(function (data) {
				console.log(data);
				if (1 === data.code) {
					$scope.newUserActivity = data.data.activitylist;
					console.log($scope.newUserActivity);
				}
			})
			.error(function (data) {
				console.log(data);
				alert('数据请求失败，请稍后再试！');
			});
			isGetActivity = true;
		}
	};

	// 自主排序中选择店铺类型
	$scope.selectStoreType = function (type) {
		$scope.storeType = type;
		$scope.isDirectSale = type === 1 ? true : false;
		$scope.isCooperate = type === 2 ? true : false;
	};

	// 自主筛选中选择优惠活动
	$scope.selectCouponActivity = function (activity) {
		activity.selected = !activity.selected;
		if (activity.selected) {
			$scope.vh.push(activity.id);
		}
		else {
			var index = $scope.vh.indexOf(activity.id);
			$scope.vh.splice(index, 1);
		}
	};

	// 自主筛选中选择新用户活动
	$scope.selectNewUserActivity = function (activity) {
		activity.selected = !activity.selected;
		if (activity.selected) {
			$scope.nu.push(activity.id);
		}
		else {
			var index = $scope.nu.indexOf(activity.id);
			$scope.nu.splice(index, 1);
		}
		console.log(activity);
	};


	// 自主筛选结束，点击确定
	$scope.selfFilter = function () {
		$scope.isShowSort = false;
		$scope.showMask = false;
		$scope.isSelfFilter =  true;
		$scope.page = 1;
		$scope.designerList = [];
		$scope.loading = false;
		$scope.loaded = false;
		getDesignerInfo();
	};
}]);