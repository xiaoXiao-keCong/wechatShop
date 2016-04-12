/**
 * Created by hugotan on 2016/4/12.
 */
angular.module('addrManage', []).controller('addrManageCtrl', function ($scope, $http) {
    var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };

    // 获取用户收货地址
    $http.post('/user/myaddress.json', postCfg)
        .success(function (data) {
            if (1 === data.code && 0 < data.data.addresslist.length) {
                $scope.addrList = data.data.addresslist;
            }
        })
        .error(function (resp) {
            console.log(resp);
        }
    );

    $scope.checkDefault = function (addr) {
        if (1 === addr.defaultflag) {
            return true;
        }
        return false;
    };
});