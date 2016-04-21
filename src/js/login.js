/**
 * Created by hugotan on 2016/4/10.
 */
angular.module('login', []).controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.login = function () {
        var test = '123456';
        // 用账号密码都为123进行测试
        var data = {account: '123', password: '123'},
            transFn = function(data) {
                return $.param(data);
            },
            postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transFn
            };
        var loginPromise = $http.post('/user/login.json', data, postCfg);
        loginPromise.then(function (resp) {
            console.log(resp);
        }, function (resp) {
            console.log(resp);
        });
    };
}]);