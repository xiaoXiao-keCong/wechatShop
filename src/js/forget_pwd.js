/**
 * Created by hugotan on 2016/4/10.
 */
index.controller('forgetPwdCtrl', ['$scope', '$interval', '$http',
	function ($scope, $interval, $http) {

	$scope.sendCodeText = '获取验证码';
	
	$scope.sendCode = function () {
		if ($scope.sending) {
			return;
		}
		var data = {
			telnum: $scope.phoneNum
		};
		$http.post('/user/modifypasswordcode.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (1 === data.code) {
				var remainTime = 60;
				$scope.sending = true;
				var timer = $interval(function () {
					if (remainTime > 0) {
						$scope.sendCodeText = '发送成功(' + (remainTime--) + ')';
					}
					else {
						$scope.sending = false;
						$interval.cancel(timer);
						$scope.sendCodeText = '获取验证码';
					}
				}, 1000);
			}
		})
		.error(function (data) {
			console.log(data);
		});
	};
}]);