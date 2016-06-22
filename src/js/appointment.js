/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('appointmentCtrl',
	['$scope', '$http', '$window', '$location', '$q', '$rootScope',
	function ($scope, $http, $window, $location, $q, $rootScope) {

	$scope.showMask = true;
	$scope.selectedItems = [{}, {}, {}, {}, {}, {}];
	$scope.jianfa = false;
	$scope.ranfa = false;
	$scope.tangfa = false;
	$scope.huli = false;
	$scope.huazhuang = false;
	$scope.meijia = false;
	$scope.timeArr = [];
	$scope.dateDeferred = $q.defer();
	$scope.dateOnlyDeferred = $q.defer();
	$scope.serviceArr = [];
	$scope.day = '日期';
	$scope.time = '选择时间';
	$scope.itemName = '项目';
	$scope.dateIndex = 0;
	$scope.timeIndex = 0;
	$scope.designerList = [];

	$rootScope.dateIndex = 0;
	$rootScope.timeIndex = 0;
	$rootScope.serviceTime = '';
	$rootScope.serviceItems = [];

	var starUrl1 = '../../assets/images/star_h.png',
        starUrl2 = '../../assets/images/star.png';

	$scope.page = 1;

	function getDesignerList() {
		if ($scope.loading) {
			return;
		}
		
		$scope.loading = true;
		var data = {
			day: $scope.dateIndex,
			time: $scope.timeIndex,
			serviceid: $scope.serviceArr,
			page: $scope.page
		};
		$http.post('/designer/quickreserve.json', data, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				var designerList = data.data.designerlist;
				if (designerList.length > 0) {
					for (var i = 0; i < designerList.length; i++) {
						designerList[i].avatar = picBasePath + designerList[i].avatar;
						designerList[i].starUrl = [];
						for (var j = 0; j < designerList[i].score; j++) {
	                        designerList[i].starUrl.push({'path': starUrl1});
	                    }
	                    for (var k = j; k < 5; k++) {
	                        designerList[i].starUrl.push({'path': starUrl2});
	                    }
	                    $scope.designerList.push(designerList[i]);
					}
					console.log($scope.designerList);
					$scope.loading = false;
					$scope.page += 1;
				}
				else {
					$scope.loaded = true;
				}
			}
		})
		.error(function (data) {
			console.log(data);
			alert('数据请求失败，请稍后再试！');
		});
	}

	$scope.getDesignerList = getDesignerList;


	// 智能推荐
	$scope.recommend = function () {
		var day = $('#date-select .swiper-slide').index($('#date-select .swiper-slide-active')) + 1,
		    time = $('#time-select .swiper-slide').index($('#time-select .swiper-slide-active')) + 1;
		$scope.showMask = false;
        $scope.dateIndex = day;
        $scope.timeIndex = time;
        $scope.day = $('#date-select .swiper-slide-active').text();
		$scope.time = $('#time-select .swiper-slide-active').text();
		$scope.designerList = [];
		$scope.page = 1;
		$scope.loading = false;
		$scope.loaded = false;
        getDesignerList();
	};
	
	// 跳过，不选择智能推荐
	$scope.jump = function () {
		$scope.showMask = false;
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
				if (!sessionStorage.user) {
					alert('请先登录!');
					$location.path(login);
					return;
				}
				var user = JSON.parse(sessionStorage.user);
				if (user.nickname === '') {
					// 跳转到完善信息
					alert('请填写您的昵称!');
					$location.path('complete_info').search({type: 'modify'});
					return;
				}
				$location.path('order');
				break;
			case 5:
				if (sessionStorage.user) {
			    	var user = JSON.parse(sessionStorage.user);
			    	if (user.nickname === '') {
			    		alert('请填写您的昵称!');
			    		$location.path('complete_info').search({type: 'modify'});
			    		return;
			    	}
			    }
				$location.path('my');
				break;
		}
	};

	// 选择预约类型
	$scope.select = function (type) {
		switch (type) {
			case 'jianfa':
				$scope.jianfa = !$scope.jianfa;
				if ($scope.jianfa) {
					$scope.selectedItems[0] = {'name': '剪发 '};
					$scope.serviceArr.push(10);
				}
				else {
					$scope.serviceArr.splice($scope.serviceArr.indexOf(10), 1);
					$scope.selectedItems[0] = {'name': ''};	
				}
			    break;
			case 'ranfa':
				$scope.ranfa = !$scope.ranfa;
				if ($scope.ranfa) {
					$scope.selectedItems[1] = {'name': '染发 '};
					$scope.serviceArr.push(11);
				}
				else {
					$scope.serviceArr.splice($scope.serviceArr.indexOf(11), 1);
					$scope.selectedItems[1] = {'name': ''};	
				}
			    break;
		    case 'tangfa':
				$scope.tangfa = !$scope.tangfa;
				if ($scope.tangfa) {
					$scope.selectedItems[2] = {'name': '烫发 '};
					$scope.serviceArr.push(12);
				}
				else {
					$scope.serviceArr.splice($scope.serviceArr.indexOf(12), 1);
					$scope.selectedItems[2] = {'name': ''};	
				}
			    break;
		    case 'huli':
				$scope.huli = !$scope.huli;
				if ($scope.huli) {
					$scope.selectedItems[3] = {'name': '护理 '};
					$scope.serviceArr.push(13);
				}
				else {
					$scope.serviceArr.splice($scope.serviceArr.indexOf(13), 1);
					$scope.selectedItems[3] = {'name': ''};	
				}
			    break;
		    case 'huazhuang':
				$scope.huazhuang = !$scope.huazhuang;
				if ($scope.huazhuang) {
					$scope.selectedItems[4] = {'name': '化妆 '};
					$scope.serviceArr.push(14);
				}
				else {
					$scope.serviceArr.splice($scope.serviceArr.indexOf(14), 1);
					$scope.selectedItems[4] = {'name': ''};	
				}
			    break;
		    case 'meijia':
				$scope.meijia = !$scope.meijia;
				if ($scope.meijia) {
					$scope.selectedItems[5] = {'name': '美甲'};
					$scope.serviceArr.push(15);
				}
				else {
					$scope.serviceArr.splice($scope.serviceArr.indexOf(15), 1);
					$scope.selectedItems[5] = {'name': ''};	
				}
			    break;
			default:
			    break;
		}
	};

	// 构造day的取值
	(function getAppointDay() {
		var date = new Date();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var week = date.getDay();
		$scope.timeArr.push({'date': setTime(month, day)});
		for (var i = 1; i < 7; i++) {
			$scope.timeArr.push({'date': addDays(i)});
		}
	})();


	function addDays(days) {
		var date = new Date();
		date = date.valueOf();
		var newDate = date + days * 24 * 60 * 60 * 1000;
		newDate = new Date(newDate);
		var month = newDate.getMonth() + 1;
		var day = newDate.getDate();
		var week = newDate.getDay();
		return setTime(month, day, week);
	}

	function setTime(month, day, week) {
		var time;
		month = month < 10 ? '0' + month + '月': month + '月';
		day = day < 10 ? '0' + day + '日' : day + '日';
		switch (week) {
			case 0:
			    time = month + day + ' (' + '周日' + ')';
			    break;
			case 1:
			    time = month + day + ' (' + '周一' + ')';
				break;
			case 2:
			    time = month + day + ' (' + '周二' + ')';
				break;
			case 3:
			    time = month + day + ' (' + '周三' + ')';
				break;
			case 4:
			    time = month + day + ' (' + '周四' + ')';
				break;
			case 5:
			    time = month + day + ' (' + '周五' + ')';
				break;
			case 6:
			    time = month + day + ' (' + '周六' + ')';
				break;
			default:
				time = month + day + ' (' + '今天' + ')';
				break;
		}
		return time;
	}

	$scope.$on('timeFinished', function () {
		$scope.dateDeferred.resolve('succeed');
	});

	$scope.$on('timeOnlyFinished', function () {
		$scope.dateOnlyDeferred.resolve('succeed');
	});

	// 点击预约发型师
	$scope.appoint = function (designer, e) {
		// 阻止冒泡
		e.stopPropagation();
		console.log($scope.dateIndex, $scope.timeIndex, $scope.serviceArr);
		// 判断是否选择了时间和项目
		if ($scope.serviceArr.length > 0) {
			if ($scope.dateIndex > 0 && $scope.timeIndex > 0) {
				// 选择了项目和时间，直接跳转到提交订单页面
				$rootScope.dateIndex = $scope.dateIndex;
				$rootScope.timeIndex = $scope.timeIndex;
				$rootScope.serviceTime = $scope.day + ' ' + $scope.time;
				$rootScope.serviceItems = $scope.serviceArr;
				$location.path('appoint_confirm/' + designer.id);
			}
			else {
				// 选择了项目，但是没有选择时间，跳转到选择时间的页面
				$rootScope.serviceItems = $scope.serviceArr;
				$location.path('select_datetime/' + designer.id);
			}
		}
		else {
			// 没有选择项目，跳转到发型师详情进行选择
			if ($scope.dateIndex > 0 && $scope.timeIndex > 0) {
				$rootScope.dateIndex = $scope.dateIndex;
				$rootScope.timeIndex = $scope.timeIndex;
				$rootScope.serviceTime = $scope.day + ' ' + $scope.time;
				$rootScope.serviceItems = $scope.serviceArr;
			}
			$location.path('stylist_detail/' + designer.id);
		}
	};
	
	$scope.selectTime = function () {
		$scope.appointMaskShow = false;
		$scope.timeShow = false;
		var timeIndex = $('#time-select-only .swiper-slide')
		.index($('#time-select-only .swiper-slide-active')) + 1;
		if (timeIndex == $scope.timeIndex) {
			return;
		}
		var selectTime = $('#time-select-only').find('.swiper-slide-active').text();
		$scope.time = selectTime;
		$scope.timeIndex = timeIndex;
		$scope.designerList = [];
		$scope.page = 1;
		$scope.loading = false;
		$scope.loaded = false;
		getDesignerList();
	};

	$scope.selectDate = function () {
		var dateIndex = $('#date-select-only .swiper-slide')
		.index($('#date-select-only .swiper-slide-active')) + 1;
		$scope.appointMaskShow = false;
		$scope.dateShow = false;
		if (dateIndex == $scope.dateIndex) {
			return;
		}
		var selectDate = $('#date-select-only').find('.swiper-slide-active').text();
		$scope.day = selectDate;
		$scope.dateIndex = dateIndex;
		$scope.designerList = [];
		$scope.page = 1;
		$scope.loading = false;
		$scope.loaded = false;
		getDesignerList();
	};

	$scope.selectItem = function () {
		var selectItem = $('#item-select-only').find('.swiper-slide-active').text();
		$scope.itemName = selectItem;
		$scope.appointMaskShow = false;
		$scope.itemShow = false;
		var items = ['jianfa', 'tangfa', 'ranfa', 'huli', 'meijia'];
		var indexArr = [10, 11, 12, 13, 14, 15];
		var itemIndex = $('#item-select-only .swiper-slide')
		.index($('#item-select-only .swiper-slide-active'));
		$scope.serviceArr.push(indexArr[itemIndex]);
		$scope.designerList = [];
		$scope.page = 1;
		$scope.loading = false;
		$scope.loaded = false;
		getDesignerList();
	};

	// 点击选择时间
	$scope.showTimeSelect = function () {
		$scope.dateShow = false;
		$scope.itemShow = false;
		$scope.timeShow = !$scope.timeShow;
		$scope.appointMaskShow = $scope.timeShow;
		
	};

	// 点击选择日期
	$scope.showDateSelect = function () {
		$scope.dateShow = !$scope.dateShow;
		$scope.itemShow = false;
		$scope.timeShow = false;
		
	};

	// 点击选择项目
	$scope.showItemSelect = function () {
		$scope.dateShow = false;
		$scope.itemShow = !$scope.itemShow;
		$scope.timeShow = false;
		$scope.appointMaskShow = $scope.itemShow;
		$scope.serviceArr = [];
		
	};

	// 取消选择时间
	$scope.cancelSelect = function () {
		$scope.dateShow = false;
		$scope.itemShow = false;
		$scope.timeShow = false;
		$scope.appointMaskShow = false;
	};

	// 点击列表，进入设计师详情
	$scope.toDetail = function (designer) {
		$location.path('stylist_detail/' + designer.id);
	};
}]);