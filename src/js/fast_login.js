/**
 * Created by hugotan on 2016/4/9.
 */
index.controller('fastLoginCtrl', ['$scope', '$http', '$window', '$location',
    function ($scope, $http, $window, $location) {

    // 获取验证码
    $scope.getCode = function () {
    	$http.post('/user/sendlogin.json', {telnum: $scope.phone}, postCfg)
    	.then(function (resp) {
    		if (1 === resp.data.code) {
    			alert('验证码发送成功！');
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
            alert('数据请求失败!请稍后再试');
    	});
    };
    // 已有账号，跳转到登录页面
    $scope.toLogin = function () {
    	$location.path('login');
    };
}]);