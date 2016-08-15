/**
 * Created by hugotan on 2016/8/7.
 */
index.controller('changeRecordCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	$scope.noRecord = false;
	$scope.recordList = [];

	// 获取兑换记录列表
	$http.post('/integralshop/integral/recordlist.json', postCfg)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var recordList = resp.data.goodsorderlist;
			if (0 >= recordList.length) {
				$scope.noRecord = true;
				return;
			}
			else {
				for (var i = 0; i < recordList.length; i++) {
					recordList[i].imgurl = picBasePath + recordList[i].imgurl;
				}
				$scope.recordList = recordList;
			}

		}
	})
	.error(function (resp) {
		alert('数据请求失败，请稍后再试！');
	});

	// 立即兑换
	$scope.toChange = function () {
		$window.history.back();
	};
}]);