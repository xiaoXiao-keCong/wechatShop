/**
 * Created by hugotan on 2016/4/10.
 */
angular.module('login', []).controller('loginCtrl',
    ['$scope', '$http', '$window', function ($scope, $http, $window) {
    var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
    $scope.validate = function () {

    };
    // 登录事件
    $scope.login = function () {
        console.log('login');
        var data = {
            account: $scope.account,
            password: $scope.password
        };
        var loginPromise = $http.post('/user/login.json', data, postCfg);
        loginPromise.then(function (resp) {
            console.log(resp);
            if (1 === resp.data.code) {
                // 登录成功，返回首页
                alert('登录成功，即将返回首页！');
                // 将用户非敏感信息存储到localstorage
                $window.location.href = 'index.html';
            }
        }, function (resp) {
            console.log(resp);
        });
    };
    // 跳转到注册页面
    $scope.toRegister = function () {
        $window.location.href = 'register.html';
    };
}]);