/**
 * Created by hugotan on 2016/4/9.
 */
index.controller('fastLoginCtrl', ['$scope', '$http', '$window', '$location', '$interval',
    function ($scope, $http, $window, $location, $interval) {

    var phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    $scope.sendCodeText = '发送验证码';

    // 获取验证码
    $scope.getCode = function () {
        if ($scope.sending) {
            return;
        }
        if (!phoneRe.test($scope.phone)) {
            alert('手机号无效！');
            return;
        }
    	$http.post('/user/sendlogin.json', {telnum: $scope.phone}, postCfg)
    	.then(function (resp) {
    		if (1 === resp.data.code) {
                $scope.sending = true;
                var leftTime = 60;
    			var timer = $interval(function () {
                    if (leftTime > 0) {
                        $scope.sendCodeText = '发送成功(' + (leftTime--) + ')';
                    }
                    else {
                        $scope.sendCodeText = '发送验证码';
                        $scope.sending = false;
                        $interval.cancel(timer);
                    }
                }, 1000);
    		}
    	}, function (resp) {
    		console.log(resp);
    	});
    };
    // 确认登录
    $scope.confirmLogin = function () {
    	var data = {
    		telnum: $scope.phone,
    		check: $scope.code
    	};
    	$http.post('/user/quicklogin.json', data, postCfg)
    	.then(function (resp) {
    		console.log(resp);
            if (1 === resp.data.code) {
                // 登录成功，将登录用户信息写到sessionStorage
                sessionStorage.setItem('user', JSON.stringify(resp.data.data));
                alert('登录成功，即将返回首页！');
            }
    	}, function (resp) {
    		console.log(resp);
            alert('数据请求失败，请稍后再试！');
    	});
    };
    // 已有账号，跳转到登录页面
    $scope.toLogin = function () {
    	$location.path('login');
    };
}]);