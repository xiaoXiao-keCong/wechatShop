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
index.controller('homeCtrl',
	['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.toMore = function (index) {
		switch (index) {
			case 1:
				// 发型师
				$window.location.href = '#/stylist';
				break;
			case 2:
				// 门店
				$window.location.href = 'store.html';
				break;
			case 3:
				// 时尚资讯
				break;
			case 4:
				// 悦尚城
				$window.location.href = 'mall.html';
				break;
			case 5:
				// 时尚发型

				break;
		}
	};
	$scope.navigate = function (index) {
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
// 发型师controller
index.controller('stylistCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.switch = function () {
		$scope.isList = !$scope.isList;
	};
	$scope.navigate = function (index) {
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
// 预约controller
index.controller('appointmentCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.itemSelect = function () {

	};
	$scope.recommend = function () {
		$scope.showMask = true;
	};
	$scope.jump = function () {
		$scope.showMask = true;
	};
	$scope.navigate = function (index) {
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
// 订单controller
index.controller('orderCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.isAppointOrder = true;
	$scope.isServiceOrder = false;
	$scope.isMallOrder = false;
	$scope.orderNav = function (index) {
		$scope.isAppointOrder = (1 === index ? true : false);
		$scope.isServiceOrder = (2 === index ? true : false);
		$scope.isMallOrder = (3 === index ? true: false);
	};
	$scope.navigate = function (index) {
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
// 我的controller
index.controller('myCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.navTo = function (index) {
		switch (index) {
			case 1:
				// 我的余额
				$window.location.href = 'balance.html';
				break;
			case 2:
				// 充值
				$window.location.href = 'recharge.html';
				break;
			case 3:
				// 优惠券
				$window.location.href = 'coupon.html';
				break;
			case 4:
				// 我的收藏
				$window.location.href = 'collection.html';
				break;
			case 5:
				// 最新活动
				$window.location.href = 'activity.html';
				break;
			case 6:
				// 购物车
				$window.location.href = 'cart.html';
				break;
			case 7:
				// 地址管理
				$window.location.href = 'addr_manage.html';
				break;
			case 8:
				// 积分商城
				// $window.location.href = '';
				break;
			case 9:
				// 设置
				$window.location.href = 'setting.html';
				break;
		}
	};
	$scope.navigate = function (index) {
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


// 底部导航栏事件
function navigate(index) {
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
}