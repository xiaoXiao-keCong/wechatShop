/**
 * Created by hugotan on 2016/6/4.
 */
index.controller('appointConfirmCtrl',
	['$scope', '$http', '$location', '$window', '$routeParams', '$rootScope',
	function ($scope, $http, $location, $window, $routeParams, $rootScope) {
	
	var designerId = $routeParams.id;
	var date = $rootScope.dateIndex;
	var time = $rootScope.timeIndex;
	$scope.serviceTime = $rootScope.serviceTime || '';
	var serviceItems = $rootScope.serviceItems;
	$scope.serviceList = [];

	// 根据id获取发型师详情
	$http.post('/designer/info.json', {'designerid': $routeParams.id}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var commentLevel = [],
				designer = resp.data.data;
			// 暂时未添加图片url前缀
			for (var i = 0; i < designer.score; i++) {
				commentLevel.push({'path': '../../assets/images/star_h.png'});
			}
			for (i = 0; i < 5 - designer.score; i++) {
				commentLevel.push({'path': '../../assets/images/star.png'});
			}
			designer.commentLevel = commentLevel;
			designer.avatar = picBasePath + designer.avatar;
			$scope.designer = designer;
		}
	}, function (resp) {
		alert('数据请求失败，请稍后再试！');
	});


	// 获取发型师的服务
	$http.post('/designer/service.json', {'designerid': designerId}, postCfg)
	.success(function (data) {
		if (1 === data.code) {
			var serviceList = data.data.servicelist;
			for (var i = 0; i < serviceItems.length; i++) {
				for (var j = 0; j < serviceList.length; j++) {
					if (serviceItems[i] == serviceList[j].id) {
						serviceList[j].serviceTime = serviceList[j].length + 'min';
						$scope.serviceList.push(serviceList[j]);
						break;
					}
				}
			}
		}
		
	})
	.error(function (data) {
		alert('数据请求失败，请稍后再试！');
	});

	$scope.confirmOrder = function () {
		var data = {
			designerid: designerId,
			day: date,
			time: time,
			serviceid: serviceItems
		};
		$http.post('/designer/reserve.json', data, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (0 === data.code) {
				// 已被预约
				alert(data.reason);
			}
			else if (1 === data.code) {
				// 预约成功，跳转到订单页面
				alert('预约成功');
				$location.path('order').replace();
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};

	$scope.back = function () {
		$rootScope.dateIndex = 0;
		$rootScope.timeIndex = 0;
		$window.history.back();
	};
}]);