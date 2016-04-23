/**
 * Created by hugotan on 2016/4/23.
 */
 var transFn = function(data) {
        return $.param(data);
    },
    postCfg = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: transFn
    };
var pay = angular.module('pay', ['ngRoute']);
// 支付界面路由
pay.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../html/pay_recharge.html',
			controller: 'payRechargeCtrl'
		})
		.when('/pay_goods', {
			templateUrl: '../html/pay_goods.html',
			controller: 'payGoodsCtrl'
		});
}]);
// 充值支付控制器
pay.controller('payRechargeCtrl', ['$scope', '$http', function ($scope, $http) {

}]);
// 商品支付控制器
pay.controller('payGoodsCtrl', ['$scope', '$http', function ($scope, $http) {

}]);