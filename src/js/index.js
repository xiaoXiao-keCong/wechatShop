/**
 * Created by hugotan on 2016/4/11.
 */
var index = angular.module('index',
	['ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures']);
// 首页路由
index.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../html/home.html',
			controller: 'homeCtrl'
		})
		.when('/stylist', {
			templateUrl: '../html/stylist.html',
			controller: 'stylistCtrl'
		})
		.when('/appointment', {
			templateUrl: '../html/appointment.html',
			controller: 'appointmentCtrl'
		})
		.when('/order', {
			templateUrl: '../html/order.html',
			controller: 'orderCtrl'
		})
		.when('/my', {
			templateUrl: '../html/my.html',
			controller: 'myCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

// 图片轮播directive
index.directive('slider', ['$swipe', '$interval', function ($swipe, $interval) {
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		templateUrl: 'slider.html',
		compile: function (element, attrs) {
			return {
				post: function postLink(scope, element, attrs) {
					var slider = element[0],
						lis = slider.getElementsByTagName('li'),
						lisLength = lis.length;
					for (var i = 0; i < lisLength; i++) {
						lis[i].style.left = i * 100 + '%';
					}
					// $interval(function () {
						
					// 	slider.style.transform = 'translate3d(-100%,0px,0px)';
					// }, 3000);
					$swipe.bind(slider, {
						end: function (touch) {
							switch(touch.direction) {
								case 'LEFT':
																		
									break;
								case 'RIGHT':
											
									break;
							}
						}
					});
				}
			};
		}
	};
}]);
// 首页controller
index.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
	
}]);
// 发型师controller
index.controller('stylistCtrl', ['$scope', '$http', function ($scope, $http) {

}]);
// 预约controller
index.controller('appointmentCtrl', ['$scope', '$http', function ($scope, $http) {

}]);
// 订单controller
index.controller('orderCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.isAppointOrder = true;
	$scope.isServiceOrder = false;
	$scope.isMallOrder = false;

	$scope.orderNav = function (index) {
		$scope.isAppointOrder = (1 === index ? true : false);
		$scope.isServiceOrder = (2 === index ? true : false);
		$scope.isMallOrder = (3 === index ? true: false);
	};
}]);
// 我的controller
index.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {

}]);

// 底部导航controller
index.controller('bottomNavCtrl', ['$scope', '$window', function ($scope, $window) {
	$scope.isHome = true;
	$scope.isStylist = false;
	$scope.isAppointment = false;
	$scope.isOrder = false;
	$scope.isMy = false;
	$scope.navigate = function (index) {
		console.log(index);
		$scope.isHome = (1 === index ? true : false);
		$scope.isStylist = (2 === index ? true :false);
		$scope.isAppointment = (3 === index ? true : false);
		$scope.isOrder = (4 === index ? true : false);
		$scope.isMy = (5 === index ? true : false);
		switch (index) {
			case 1:
				$window.location.href = '#/';
				break;
			case 2:
				$window.location.href = '#/stylist';
				break;
			case 3:
				$window.location.href = '#/appointment';
				break;
			case 4:
				$window.location.href = '#/order';
				break;
			case 5:
				$window.location.href = '#/my';
				break;
		}

	};
}]);