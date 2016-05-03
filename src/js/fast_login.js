/**
 * Created by hugotan on 2016/4/9.
 */
angular.module('fastLogin', []).controller('fastLoginCtrl',
	['$scope', '$http', '$window', function ($scope, $http, $window) {

	var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };

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
    	}, function (resp) {
    		console.log(resp);
    	});
    };
    // 已有账号，跳转到登录页面
    $scope.toLogin = function () {
    	$window.location.href = 'login.html';
    };

}]);