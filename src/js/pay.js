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
// 充值支付控制器
index.controller('payRechargeCtrl', ['$scope', '$http', function ($scope, $http) {

}]);
// 商品支付控制器
index.controller('payGoodsCtrl', ['$scope', '$http', function ($scope, $http) {
	
}]);