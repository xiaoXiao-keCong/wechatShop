/**
 * Created by hugotan on 2016/4/16.
 */
angular.module('coupon', []).controller('couponCtrl', function ($scope, $http) {
    var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
    

});