/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('fashionHairStyleCtrl',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
	// 跳转到时尚发型详情
	$scope.showHairInfo = function (hair) {
		$location.path('fashion_hair_info/' + hair.id);
	};

	// 时尚发型列表
	$http.post('/home/fashionhair.json', {'page': 1}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var fashionHairList = resp.data.data.fashionhairlist;
			for (var i = 0, j = fashionHairList.length; i < j; i++) {
				fashionHairList[i].imgurl = picBasePath + fashionHairList[i].imgurl;
			}
			$scope.fashionHairList = fashionHairList;
		}
	}, function (resp) {
		console.log(resp);
		// alert('数据请求失败!请稍后再试');
	});
}]);