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
		.when('/pay_recharge', {
			templateUrl: '../html/pay_recharge.html',
			controller: 'payRechargeCtrl'
		})
		.when('/pay_goods', {
			templateUrl: '../html/pay_goods.html',
			controller: 'payGoodsCtrl'
		})
		.when('/mall', {
			templateUrl: '../html/mall.html',
			controller: 'mallCtrl'
		})
		.when('/store', {
			templateUrl: '../html/store.html',
			controller: 'storeCtrl'
		})
		.when('/store_detail', {
			templateUrl: '../html/store_detail.html',
			controller: 'storeDetailCtrl'
		})
		.when('/order_detail', {
			templateUrl: '../html/order_detail.html',
			controller: 'orderDetailCtrl'
		})
		.when('/mall_goods_detail', {
			templateUrl: '../html/mall_goods_detail.html',
			controller: 'mallGoodsDetailCtrl'
		})
		.when('/fashion_hairstyle', {
			templateUrl: '../html/fashion_hairstyle.html',
			controller: 'fashionHairStyleCtrl'
		})
		.when('/fashion_information', {
			templateUrl: '../html/fashion_information.html',
			controller: 'fashionInformationCtrl'
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
						lisLength = lis.length,
						width = element.width(),
						totalWidth = lisLength * width,
						slideFunc = function () {
							var left = element.offset().left,
								offset = left - width;
							if (Math.abs(offset) === totalWidth) {
								offset = 0;
							}
							slider.style.transform = 'translateX(' + offset + 'px)';
						};
					for (var i = 0; i < lisLength; i++) {
						lis[i].style.left = i * 100 + '%';
					}
					var timer = $interval(slideFunc, 3000);
					$swipe.bind(slider, {
						start: function (touch) {
							$interval.cancel(timer);
						},
						end: function (touch) {

							switch(touch.direction) {
								case 'LEFT':
									// 向左滑动
									var left = element.offset().left,
										offset = left - width;
									if (Math.abs(offset) === totalWidth) {
										break;
									}
									else {
										slider.style.transform = 'translateX(' + offset + 'px)';
									}
									break;
								case 'RIGHT':
									// 向右滑动
									var left = element.offset().left,
										offset = left + width;
									if (left === 0) {
										break;
									}
									else {
										slider.style.transform = 'translateX(' + offset + 'px)';
									}
									break;
							}
							timer = $interval(slideFunc, 3000);
						}
					});
				}
			};
		}
	};
}]);
