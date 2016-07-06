/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('goPayCtrl',
	['$scope', '$http', '$location', '$window', '$rootScope',
	function ($scope, $http, $location, $window, $rootScope) {
	
	var hasDesigner = false;
	$scope.tabs = [];
	$scope.selectedItemId = [];
	// $scope.price = '请先选择项目';

	(function init() {
		if ($rootScope.designer) {
			$scope.designer = $rootScope.designer;
			$scope.designerName = $scope.designer.name;
			hasDesigner = true;
			getDesignerService($scope.designer);
		}
		else {
			$scope.designerName = '请选择';
			// 获取项目列表
			$http.post('/user/payorder.json', postCfg)
			.success(function (data) {
				if (1 === data.code) {
					var serviceList = data.data.serviceonelist;
					for (var i = 0; i < serviceList.length; i++) {
						serviceList[i].imgurl = picBasePath + '/' + serviceList[i].imgurl;
						serviceList[i].disableimgurl = picBasePath + serviceList[i].disableimgurl;
						serviceList[i].clickimgurl = picBasePath + serviceList[i].clickimgurl;
						serviceList[i].img = serviceList[i].imgurl;
					}
					$scope.serviceList = serviceList;
				}
			})
			.error(function (data) {
				alert('数据请求失败，请稍后再试！');
			});
		}
		
		// 获取打折和立减活动列表
		$http.post('/user/getactivitylistofcommon.json', postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
				return;
			}
			if (1 === data.code) {
				var activityList = data.data.activitylist;
				$scope.commonActivityList = activityList;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
		// 获取新用户活动列表
		$http.post('/user/getactivitylistofnewuser.json', postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
				return;
			}
			if (1 === data.code) {
				var activityList = data.data.activitylist;
				$scope.nuActivityList = activityList;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	})();
	
	// 根据设计师获取服务列表
	function getDesignerService(designer) {
		$http.post('/user/getdesignerserviceone.json', {designerid: designer.id}, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
				return;
			}
			if (1 === data.code) {
				var serviceList = data.data.serviceonelist;
				for (var i = 0; i < serviceList.length; i++) {
					serviceList[i].imgurl = picBasePath + serviceList[i].imgurl;
					serviceList[i].disableimgurl = picBasePath + serviceList[i].disableimgurl;
					serviceList[i].clickimgurl = picBasePath + serviceList[i].clickimgurl;
					serviceList[i].img = (serviceList[i].disable === 1) ? serviceList[i].disableimgurl : serviceList[i].imgurl;
				}
				$scope.serviceList = serviceList;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	}

	$scope.selectStore = function () {
		$location.path('select_store');
	};



	// 选择新用户活动
	$scope.selectNUActivity = function (activity) {
		if (!$scope.selectedItemId || $scope.selectedItemId.length === 0) {
			alert('请先选择项目!');
			return;
		}
		activity.selected = !activity.selected;
		var nuActivityIdList  = [];
		for (var i = 0; i < $scope.nuActivityList.length; i++) {
			if ($scope.nuActivityList[i].selected) {
				nuActivityIdList.push($scope.nuActivityList[i].id);
			}
		}
		$scope.nuActivityIdList = nuActivityIdList;
		getConsumerSumPrice();
	};

	// 选择打折和立减活动列表
	$scope.selectCommonActivity = function (activity) {
		if (!$scope.selectedItemId || $scope.selectedItemId.length === 0) {
			alert('请先选择项目!');
			return;
		}
		var flag = !activity.selected;
		for (var i = 0; i < $scope.commonActivityList.length; i++) {
			$scope.commonActivityList[i].selected = false;
		}
		activity.selected = flag;
		if (activity.selected) {
			// 选中了打折和立减活动
			$scope.discountFlag = 3;
			$scope.discountValue = activity.id;
		}
		else {
			$scope.discountFlag = 0;
			$scope.discountValue = 0;
		}
		getConsumerSumPrice();
	};


	// 下订单
	$scope.confirm = function () {
		if (!$scope.selectedItemId || $scope.selectedItemId.length === 0) {
			alert('请先选择项目!');
			return;
		}
		var data = {
			designerservicethreeid: $scope.selectedItemId,
			designerid: $scope.designer.id,
			discountflag: $scope.discountFlag,
			discountvalue: $scope.discountValue,
			newuseractivityid: $scope.nuActivityIdList
		};
		$http.post('/user/generateconsumedorder.json', data, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				// 跳转到支付页面
				var orderId = data.data.id;
				$location.path('pay_service/' + orderId);
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};

		// 点击一级服务项目，请求子服务项目
	$scope.showService = function (service) {
		if (!hasDesigner) {
			alert('请选择发型师!');
			return;
		}
		if (service.disable === 1) {
			return;
		}
		$scope.showMask = true;
		$scope.selectedImg = service.clickimgurl;
		var data = {
			serviceoneid: service.id,
			designerid: $scope.designer.id
		};
		$http.post('/user/getserviceitem.json', data, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				var itemData = data.data,
				    tab = itemData.tab;
				if (1 === tab.length && tab[0] === 'serviceitem') {
					// 此时没有tab选项，直接显示第三级的项目
					$scope.hasTab = false;
					var serviceItemList = itemData.serviceitem;
					$scope.serviceItemList = serviceItemList;
				}
				else {
					// 显示tab并且显示每一个tab中对应的项目
					$scope.hasTab = true;
					$scope.tabs = [];
					$scope.itemData = itemData;
					for (var i = 0; i < tab.length; i++) {
						$scope.tabs.push({tabName: tab[i], selected: false});
					}
					$scope.tabs[0].selected = true;
					$scope.serviceItemList = $scope.itemData[tab[0]];
				}
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};

	$scope.hideMask = function () {
		$scope.showMask = false;
	};

	// 选中项目
	$scope.selectItem = function (item) {
		item.selected = !item.selected;
	};

	// 点击tab
	$scope.selectTab = function (tab) {
		if (tab.selected) {
			return;
		}
		for (var i = 0; i < $scope.tabs.length; i++) {
			$scope.tabs[i].selected = false;
		}
		tab.selected = true;
		$scope.serviceItemList = $scope.itemData[tab.tabName];
	};

	// 确认选中项目
	$scope.confirmSelectItem = function () {
		var selectFlag = false;
		$scope.selectedItemId = [];
		for (var i = 0; i < $scope.serviceItemList.length; i++) {
			if ($scope.serviceItemList[i].selected) {
				$scope.selectedItemId.push($scope.serviceItemList[i].id);
				selectFlag = true;
			}
		}
		if (!selectFlag) {
			alert('请选择项目!');
			return;
		}
		$scope.showMask = false;
		// 计算价格
		getConsumerSumPrice();
	};

	// 计算总计金额
	function getConsumerSumPrice() {
		var data = {
			designerservicethreeid: $scope.selectedItemId,
			discountflag: $scope.discountFlag,
			discountvalue: $scope.discountValue,
			newuseractivityid: $scope.nuActivityIdList
		};
		$http.post('/user/getconsumersumprice.json', data, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				$scope.price = data.data.price;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	}

}]);