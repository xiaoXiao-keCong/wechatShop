/**
 * Created by hugotan on 2016/4/11.
 */
var index = angular.module('index',
	['ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures', 'ngFileUpload']);
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
		.when('/login', {
			templateUrl: '../html/login.html',
			controller: 'loginCtrl'
		})
		.when('/register', {
			templateUrl: '../html/register.html',
			controller: 'registerCtrl'
		})
		.when('/fast_login', {
			templateUrl: '../html/fast_login.html',
			controller: 'fastLoginCtrl'
		})
		.when('/forget_pwd', {
			templateUrl: '../html/forget_pwd.html',
			controller: 'forgetPwdCtrl'
		})
		.when('/addr_manage', {
			templateUrl: '../html/addr_manage.html',
			controller: 'addrManageCtrl'
		})
		.when('/add_receiver', {
			templateUrl: '../html/add_receiver.html',
			controller: 'addReceiverCtrl'
		})
		.when('/setting', {
			templateUrl: '../html/setting.html',
			controller: 'settingCtrl'
		})
		.when('/address', {
			templateUrl: '../html/address.html',
			controller: 'addressCtrl'
		})
		.when('/cart', {
			templateUrl: '../html/cart.html',
			controller: 'cartCtrl'
		})
		.when('/balance', {
			templateUrl: '../html/balance.html',
			controller: 'balanceCtrl'
		})
		.when('/collection', {
			templateUrl: '../html/collection.html',
			controller: 'collectionCtrl'
		})
		.when('/complete_info', {
			templateUrl: '../html/complete_info.html',
			controller: 'completeInfoCtrl'
		})
		.when('/recharge', {
			templateUrl: '../html/recharge.html',
			controller: 'rechargeCtrl'
		})
		.when('/coupon', {
			templateUrl: '../html/coupon.html',
			controller: 'couponCtrl'
		})
		.when('/activity', {
			templateUrl: '../html/activity.html',
			controller: 'activityCtrl'
		})
		.when('/point_mall', {
			templateUrl: '../html/point_mall.html',
			controller: 'pointMallCtrl'
		})
		.when('/point_goods_detail', {
			templateUrl: '../html/point_goods_detail.html',
			controller: 'pointGoodsDetailCtrl'
		})
		.when('/point_order_confirm', {
			templateUrl: '../html/point_order_confirm.html',
			controller: 'pointOrderConfirmCtrl'
		})
		.when('/change_tip', {
			templateUrl: '../html/change_tip.html',
			controller: 'changeTipCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

// 图片轮播directive
// index.directive('slider', ['$swipe', '$interval', function ($swipe, $interval) {
// 	return {
// 		restrict: 'EA',
// 		replace: true,
// 		transclude: true,
// 		templateUrl: 'slider.html',
// 		compile: function (element, attrs) {
// 			return {
// 				post: function postLink(scope, element, attrs) {
// 					var slider = element[0],
// 						lis = slider.getElementsByTagName('li'),
// 						lisLength = lis.length;
// 					for (var i = 0; i < lisLength; i++) {
// 						lis[i].style.left = i * 100 + '%';
// 					}
// 					// $interval(function () {
						
// 					// 	slider.style.transform = 'translate3d(-100%,0px,0px)';
// 					// }, 3000);
// 					$swipe.bind(slider, {
// 						end: function (touch) {
// 							switch(touch.direction) {
// 								case 'LEFT':
																		
// 									break;
// 								case 'RIGHT':
											
// 									break;
// 							}
// 						}
// 					});
// 				}
// 			};
// 		}
// 	};
// }]);
// 首页controller
index.controller('homeCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
	$scope.toMore = function (index) {
		switch (index) {
			case 1:
				// 发型师
				// $window.location.href = '#/stylist';
				$location.path('stylist');
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
				// $window.location.href = '#/';
				$location.path('/');
				break;
			case 2:
				// $window.location.href = '#/stylist';
				$location.path('stylist');
				break;
			case 3:
				// $window.location.href = '#/appointment';
				$location.path('appointment');
				break;
			case 4:
				// $window.location.href = '#/order';
				$location.path('order');
				break;
			case 5:
				// $window.location.href = '#/my';
				$location.path('my');
				break;
		}
	};
}]);
// 发型师controller
index.controller('stylistCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
	$scope.switch = function () {
		$scope.isList = !$scope.isList;
	};
	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				// $window.location.href = '#/';
				$location.path('/');
				break;
			case 2:
				// $window.location.href = '#/stylist';
				$location.path('stylist');
				break;
			case 3:
				// $window.location.href = '#/appointment';
				$location.path('appointment');
				break;
			case 4:
				// $window.location.href = '#/order';
				$location.path('order');
				break;
			case 5:
				// $window.location.href = '#/my';
				$location.path('my');
				break;
		}
	};
}]);
// 预约controller
index.controller('appointmentCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
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
				// $window.location.href = '#/';
				$location.path('/');
				break;
			case 2:
				// $window.location.href = '#/stylist';
				$location.path('stylist');
				break;
			case 3:
				// $window.location.href = '#/appointment';
				$location.path('appointment');
				break;
			case 4:
				// $window.location.href = '#/order';
				$location.path('order');
				break;
			case 5:
				// $window.location.href = '#/my';
				$location.path('my');
				break;
		}
	};
}]);
// 订单controller
index.controller('orderCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
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
				// $window.location.href = '#/';
				$location.path('/');
				break;
			case 2:
				// $window.location.href = '#/stylist';
				$location.path('stylist');
				break;
			case 3:
				// $window.location.href = '#/appointment';
				$location.path('appointment');
				break;
			case 4:
				// $window.location.href = '#/order';
				$location.path('order');
				break;
			case 5:
				// $window.location.href = '#/my';
				$location.path('my');
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

