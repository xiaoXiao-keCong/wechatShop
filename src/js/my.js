/**
 * Created by hugotan on 2016/4/11.
 */
index.controller('myCtrl',
	['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {

	(function init() {
		if (sessionStorage.user) {
			$scope.isLogin = true;
			var user = JSON.parse(sessionStorage.user);
			$scope.userPic = user.imgurl === '' ? '../../assets/images/head-none.png' : picBasePath + user.imgurl;
			$scope.name = user.nickname;
			$scope.type = user.vip.name;
			$scope.typeImg = picBasePath + user.vip.smallimgurl;
			$scope.balance = user.balance;
			$scope.score = user.score;
		}
		else {
			$scope.userPic = '../../assets/images/head-none.png';
			$scope.balance = '--';
			$scope.score = '--';
		}
	})();

	$scope.navTo = function (index) {
		switch (index) {
			case 1:
				// 我的余额
				checkLogin();
				$timeout(function () {
					$location.path('balance');
				}, 0);
				break;
			case 2:
				// 充值
				checkLogin();
				$timeout(function () {
					$location.path('recharge');
				}, 0);
				break;
			case 3:
				// 优惠券
				checkLogin();
				$timeout(function () {
					$location.path('coupon');
				}, 0);
				break;
			case 4:
				// 我的收藏
				checkLogin();
				$timeout(function () {
					$location.path('collection');
				}, 0);
				break;
			case 5:
				// 最新活动
				$timeout(function () {
					$location.path('activity');
				}, 0);
				break;
			case 6:
				// 购物车
				checkLogin();
				$timeout(function () {
					$location.path('cart');
				}, 0);
				break;
			case 7:
				// 地址管理
				checkLogin();
				$timeout(function () {
					$location.path('addr_manage');
				}, 0);
				break;
			case 8:
				// 积分商城
				$timeout(function () {
					$location.path('point_mall');
				}, 0);
				break;
			case 9:
				// 设置
				checkLogin();
				$timeout(function () {
					$location.path('setting');
				}, 0);
				break;
		}
	};

	function checkLogin() {
		if (!sessionStorage.user) {
			// 用户未登录，跳转到登录页面
			$location.path('login');
			return;
		}
		var user = JSON.parse(sessionStorage.user);
		if (user.nickname === '') {
			// 跳转到完善信息
			alert('请填写您的昵称!');
			$location.path('complete_info').search({type: 'modify'});
			return;
		}
	}

	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				$timeout(function () {
					$location.path('/');
				}, 0);
				break;
			case 2:
				$timeout(function () {
					$location.path('stylist');
				}, 0);
				break;
			case 3:
				$timeout(function () {
					$location.path('appointment');
				}, 0);
				break;
			case 4:
				$timeout(function () {
					$location.path('order');
				}, 0);
				break;
			case 5:
				$timeout(function () {
					$location.path('my');
				}, 0);
				break;
		}
	};

	$scope.toEditInfo = function () {
		if (!sessionStorage.user) {
			$location.path('login');
			return;
		}
		$location.path('edit_info');
	};

	// 点击积分跳转到积分商城
	// $scope.toPointMall = function () {
	// 	$location.path('point_mall');
	// };

	// 点击余额跳转到我的余额
	$scope.toBalance = function () {
		$location.path('balance');
	};

	// 点击邀请好友即送500悦币
	$scope.toInvite = function () {
		$location.path('invite');
	};
}]);