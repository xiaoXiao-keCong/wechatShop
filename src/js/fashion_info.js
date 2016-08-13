/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('fashionInfoCtrl',
	['$scope', '$http', '$location', '$window', '$q',
	function ($scope, $http, $location, $window, $q) {
	
	$scope.deferred = $q.defer();
	$scope.page = 1;    // 页数

	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});

	// 时尚资讯轮播图
	$http.post('/home/fashionnews/home.json', postCfg)
	.success(function (resp) {
		if (1 === resp.code) {
			var fashionNewsList = resp.data.fashionnewslist;
			for (var i = 0; i < fashionNewsList.length; i++) {
				fashionNewsList[i].imgurl = picBasePath + fashionNewsList[i].imgurl;
			}
			$scope.fashionNewsList = fashionNewsList;
		}
	})
	.error(function (resp) {
		alert('数据请求失败，请稍后再试！ ');
	});

	// 时尚资讯头条
	$http.post('/home/fashionnews/top.json', postCfg)
	.success(function (resp) {
		if (1 === resp.code) {
			var headline = resp.data.fashionnewslist[0];
			$scope.headline = headline;
			console.log(headline);
		}
	})
	.error(function () {
		alert('数据请求失败，请稍后再试！');
	});

	// 获取悦人物和悦时尚
	function getInfo(type) {
		var data = {
			type: type,
			page: $scope.page
		};
		$http.post('/home/fashionnews/search.json', data, postCfg)
		.success(function (resp) {
			console.log(resp);
		})
		.error(function () {
			alert('数据请求失败，请稍后再试！');
		});
	}

}]);