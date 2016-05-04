/**
 * Created by hugotan on 2016/4/11.
 */
index.controller('myCtrl',
	['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
	$scope.navTo = function (index) {
		switch (index) {
			case 1:
				// 我的余额
				$location.path('balance');
				break;
			case 2:
				// 充值
				$location.path('recharge');
				break;
			case 3:
				// 优惠券
				$location.path('coupon');
				break;
			case 4:
				// 我的收藏
				$location.path('collection');
				break;
			case 5:
				// 最新活动
				$location.path('activity');
				break;
			case 6:
				// 购物车
				$location.path('cart');
				break;
			case 7:
				// 地址管理
				$location.path('addr_manage');
				break;
			case 8:
				// 积分商城
				$location.path('point_mall');
				break;
			case 9:
				// 设置
				$location.path('setting');
				break;
		}
	};
	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				$location.path('/');
				break;
			case 2:
				$location.path('stylist');
				break;
			case 3:
				$location.path('appointment');
				break;
			case 4:
				$location.path('order');
				break;
			case 5:
				$location.path('my');
				break;
		}
	};
}]);