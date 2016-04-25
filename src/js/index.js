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
		.otherwise({
			redirectTo: '/'
		});
}]);


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
					$interval(function () {
						
						slider.style.transform = 'translate3d(-100%,0px,0px)';
					}, 3000);
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

index.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
	
}]);