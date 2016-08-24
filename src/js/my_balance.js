/**
 * Created by hugotan on 2016/8/21.
 */
index.controller('myBalanceCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	// 初始化
	(function init() {
		// 获取当前余额
		$http.post('/user/getcurrentbalance.json', postCfg)
		.success(function (resp) {
			if (-1 === resp.code) {
				$location.path('login');
				return;
			}
			if (1 === resp.code) {
				$scope.balance = resp.data.balance;
			}
		})
		.error(function (resp) {
			alert('数据请求失败，请稍后再试！');
		});
		// 获取vip信息
		$http.post('/user/getallvip.json', postCfg)
		.success(function (resp) {
			if (-1 === resp.code) {
				$location.path('login');
				return;
			}
			if (1 === resp.code) {
				var vipList = resp.data.viplist;
				for (var i = 0; i < vipList.length; i++) {
					vipList[i].imgurl = picBasePath + '/' + vipList[i].imgurl;
					vipList[i].style = {
						'background-image': 'url(' + vipList[i].imgurl + ')',
						'background-size': '100% 100%'
					};
				}
				$scope.vipList = vipList;
				console.log(vipList);
			}
		})
		.error(function (resp) {
			alert('数据请求失败，请稍后再试！');
		});
	})();

	$scope.recharge = function (item) {
		console.log(item);
	};
}]);