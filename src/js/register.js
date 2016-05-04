/**
 * Created by hugotan on 2016/4/9.
 */
index.controller('registerCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    
    var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
    // 发送验证码事件
    $scope.sendCode = function () {
    	// 判断手机是否注册
    	console.log($scope.account);
    	var judgePromise = $http.post('/user/exist.json', {account: $scope.account}, postCfg);
    	judgePromise.then(function (resp) {
    		console.log(resp);
    		if (1 === resp.data.code) {
    			if (1 === resp.data.data.exist) {
    				// 已经存在
    				alert('该手机号码已经注册，请直接登录！');
    			}
    			else {
    				// 发送验证码到手机
    				var codePromise = $http.post('/user/sendregist.json', {telnum: $scope.account}, postCfg);
			    	codePromise.then(function (resp) {
			    		if (0 === resp.data.code) {
			    			alert(resp.data.reason);
			    		}
			    	}, function (resp) {
			    		console.log(resp);
			    	});
    			}
    		}
    	}, function (resp) {
    		console.log(resp);
    	});
    	
    };

    // 注册按钮点击事件
    $scope.register = function () {
    	var data = {
    		account: $scope.account,
    		password: $scope.password,
    		check: $scope.code
    	};
    	var registerPromise = $http.post('/user/regist.json', data, postCfg);
    	registerPromise.then(function (resp) {
    		console.log(resp);
    		if (1 === resp.data.code) {
    			alert('注册成功');
    			// 跳转到完善信息界面
    			$window.location.replace('complete_info.html');
    		}
    	}, function (resp) {
    		console.log(resp);
    	});
    };

}]);