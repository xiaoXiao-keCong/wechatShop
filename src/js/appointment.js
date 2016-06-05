/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('appointmentCtrl',
	['$scope', '$http', '$window', '$location', '$q',
	function ($scope, $http, $window, $location, $q) {

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
	$scope.serviceArr = [];

	// 智能推荐
	$scope.recommend = function () {
		var serviceId = ($scope.serviceArr.length === 0) ?
		    [10, 11, 12, 13, 14, 15] : $scope.serviceArr,
		    day = $('#date-select .swiper-slide').index($('#date-select .swiper-slide-active')) + 1,
		    time = $('#time-select .swiper-slide').index($('#time-select .swiper-slide-active')) + 1,
		    data = {
				day: day,
				time: time,
				serviceid: serviceId,
				page: 1,
				sort: 'default'
			},
			starUrl1 = '../../assets/images/star_h.png',
            starUrl2 = '../../assets/images/star.png';
		$http.post('/designer/quickreserve.json', data, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				$scope.showMask = false;
				console.log(data);
				var designerList = data.data.designerlist;
				for (var i = 0; i < designerList.length; i++) {
					designerList[i].avatar = picBasePath + designerList[i].avatar;
					designerList[i].starUrl = [];
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
		})
		.error(function (data) {
			console.log(data);
			alert('数据请求失败，请稍后再试！');
		});
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
				$location.path('order');
				break;
			case 5:
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
	

}]);