index.controller('fastLoginCtrl', ['$scope', '$http', '$window', '$location', '$interval','$timeout',
    function ($scope, $http, $window, $location, $interval,$timeout) {

    var phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var codeRe = /^\d{4}$/;
    $scope.sendCodeText = '发送验证码';
    $scope.modalText = '';
    // 获取验证码
    $scope.getCode = function () {
        if ($scope.sending) {
            return;
        }
        if (!phoneRe.test($scope.phone)) {
            $scope.modalText='手机号码无效，请重新输入！';
            $('#myModal').modal('show');
            return;
        }
    	$http.post('/user/unl/sendlogin.json', {telephone: $scope.phone}, postCfg)
    	.then(function (resp) {
            // console.log(resp);
    		if (1 === resp.data.code) {
                $scope.sending = true;
                var leftTime = 60;
    			var timer = $interval(function () {
                    if (leftTime > 0) {
                        $scope.sendCodeText = '重新发送(' + (leftTime--) + ')';
                    }
                    else {
                        $scope.sendCodeText = '发送验证码';
                        $scope.sending = false;
                        $interval.cancel(timer);
                    }
                }, 1000);
    		}else{
                weui.alert(resp.data.reason, function () {
                }, {
                    title: '温馨提示'
                });
            }
    	}, function (resp) {
    		// console.log(resp);
    	});
    };
    // 确认登录
    $scope.confirmLogin = function () {
        if (-1 === checkParams()) {
            return;
        }
    	var data = {
    		telephone: $scope.phone,
    		check: $scope.code,
            type:1
    	};
    	$http.post('/user/unl/login.json', data, postCfg)
    	.then(function (resp) {
            if (1 === resp.data.code) {
                // console.log(resp);
                // 登录成功，将登录用户信息写到sessionStorage
                var user = resp.data.data;
                sessionStorage.setItem('user', JSON.stringify(user));
                // if (user.nickname === '') {
                //     // 昵称为空，跳转到完善信息页面
                //     $location.path('complete_info').search({type: 'modify'}).replace();
                //     return;
                // }
                $timeout(function () {
                    $window.history.back();
                });
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef3e1498e754b61d&redirect_uri=http:%2F%2Fkssapit.bjxiaoyuekeji.com%2Fwechatshop%2Fbuild%2Fhtml%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
            }
            else{
                weui.alert(resp.data.reason, function () {
                }, {
                    title: '温馨提示'
                });
            }
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef3e1498e754b61d&redirect_uri=http:%2F%2Fkssapit.bjxiaoyuekeji.com%2Fwechatshop%2Fbuild%2Fhtml%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    	}, function (resp) {
            // alert('数据请求失败，请稍后再试！');
    	});
    };

    function checkParams() {
        if (!phoneRe.test($scope.phone)) {
            $scope.modalText='手机号码无效，请重新输入！';
            $('#myModal').modal('show');
            return -1;
        }
        if (!codeRe.test($scope.code)) {
            $scope.modalText='验证码无效，请确认后输入！';
            $('#myModal').modal('show');
            return -1;
        }
        return 1;
    }
}]);