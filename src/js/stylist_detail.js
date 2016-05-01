/**
 * Created by hugotan on 2016/4/30.
 */
var stylistDetail = angular.module('stylistDetail',
	['ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures']);
// 发型师详情路由
stylistDetail.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/project', {
			templateUrl: '../html/stylist_proj.html',
			controller: 'stylistProjCtrl'
		})
		.when('/price', {
			templateUrl: '../html/stylist_price.html',
			controller: 'stylistPriceCtrl'
		})
		.when('/life', {
			templateUrl: '../html/stylist_life.html',
			controller: 'stylistLifeCtrl'
		})
		.when('/work', {
			templateUrl: '../html/stylist_work.html',
			controller: 'stylistWorkCtrl'
		})
		.otherwise({
			redirectTo: '/project'
		});
}]);

stylistDetail.controller('stylistProjCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

}]);
stylistDetail.controller('stylistPriceCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

}]);
stylistDetail.controller('stylistLifeCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

}]);
stylistDetail.controller('stylistWorkCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

}]);