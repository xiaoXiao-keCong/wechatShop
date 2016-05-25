/**
 * Created by hugotan on 2016/4/10.
 */
index.controller('loginCtrl', ['$scope', '$http', '$window', '$location', '$rootScope', '$timeout',
    function ($scope, $http, $window, $location, $rootScope, $timeout) {
    
    $scope.validate = function () {

    };
    // 登录事件
    $scope.login = function () {
        var data = {
            account: $scope.account,
            password: $scope.password
        };
        var loginPromise = $http.post('/user/login.json', data, postCfg);
        loginPromise.then(function (resp) {
            
            if (1 === resp.data.code) {
                // 存储用户信息到sessionStorage
                sessionStorage.setItem('user', JSON.stringify(resp.data.data));
                $timeout(function () {
                    // 登录成功，返回上一页或者首页
                    if ($rootScope.preUrl !== undefined) {
                        alert('登录成功，即将返回上一页！');
                        $location.path($rootScope.preUrl).replace();
                    }
                    else {
                        alert('登录成功，即将返回首页！');
                        $location.path('/').replace();
                    }
                    
                });
            }
            else {
                alert(resp.data.reason);
            }
        }, function (resp) {
            console.log(resp);
            alert('数据请求失败!请稍后再试');
        });
    };
    // 跳转到注册页面
    $scope.toRegister = function () {
        $location.path('register');
    };
}]);