/**
 * Created by hugotan on 2016/4/10.
 */
index.controller('loginCtrl', ['$scope', '$http', '$window', '$location', '$rootScope', '$timeout',
    function ($scope, $http, $window, $location, $rootScope, $timeout) {
    
    var phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var pwdRe = /^[0-9a-zA-Z_]{6,20}/;
    // 登录事件
    $scope.login = function () {
        if (-1 === checkParams()) {
            return;
        }
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
                    $window.history.back();
                });
            }
            else {
                alert(resp.data.reason);
            }
        }, function (resp) {
            alert('数据请求失败!请稍后再试');
        });
    };
    // 跳转到注册页面
    $scope.toRegister = function () {
        $location.path('register');
    };

     function checkParams() {
        if (!phoneRe.test($scope.account)) {
            alert('手机号无效！');
            return -1;
        }
        if (!pwdRe.test($scope.password)) {
            alert('密码无效！');
            return -1;
        }
        return 1;
    }
}]);