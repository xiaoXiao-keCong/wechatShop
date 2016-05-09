/**
 * Created by hugotan on 2016/4/9.
 */
index.controller('settingCtrl',
	['$scope', '$location', '$rootScope', '$http', '$timeout',
	function ($scope, $location, $rootScope, $http, $timeout) {
	(function init() {
		if (sessionStorage.user) {
			$scope.isLogin = true;
		}
	})();
	$scope.logout = function () {
		$http.post('/user/logout.json', postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				// 退出成功，清除sessionStorage
				sessionStorage.removeItem('user');
				alert('退出登录成功！');
				// 此时应该跳转到登录界面
				$location.path('login');
			}
		}, function (resp) {
			console.log(resp);
			alert('数据请求失败!请稍后再试');
		});
	};
	// 跳转到相应的页面
	$scope.navTo = function (index) {
		switch (index) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
		}
	};
}]);
