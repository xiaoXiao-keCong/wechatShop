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
        }, function (resp) {
            console.log(resp);
        });
    };
    // 跳转到注册页面
    $scope.toRegister = function () {
        $window.location.href = 'register.html';
    };
}]);