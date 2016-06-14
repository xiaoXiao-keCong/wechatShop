/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('editInfoCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	(function init() {
		var user = JSON.parse(sessionStorage.user);
		console.log(user);
		$scope.nickname = user.nickname;
		$scope.phone = user.account;
		$scope.sex = user.sexname;
		$scope.birthday = user.birthday;
	})();

	// 修改登录密码
	$scope.editLoginPwd = function () {
		$location.path('forget_pwd').search({type: 'login'});
	};

	// 修改支付密码
	$scope.editPayPwd = function () {
		$location.path('forget_pwd').search({type: 'pay'});
	};
}]);