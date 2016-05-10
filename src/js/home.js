/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('homeCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

	$scope.toMore = function (index) {
		switch (index) {
			case 1:
				// 发型师
				$location.path('stylist');
				break;
			case 2:
				// 门店
				$location.path('store');
				break;
			case 3:
				// 时尚资讯
				$location.path('fashion_information');
				break;
			case 4:
				// 悦尚城
				$location.path('mall');
				break;
			case 5:
				// 时尚发型
				$location.path('fashion_hairstyle');
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

	// 首页轮播图
	$http.post('/home/homead.json', {'cityid': 1}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var homeAdList = resp.data.data.homeadlist;
			for (var i = 0; i < homeAdList.length; i++) {
				homeAdList[i].imgurl = picBasePath + homeAdList[i].imgurl;
			}
			$scope.adList = homeAdList;
		}
	}, function (resp) {
		// alert('数据请求失败!请稍后再试');
	});

	// 轮播图跳转
	$scope.jump = function (ad) {
		$window.location.href = ad.jumpurl;
	};

	// 明星门店
	$http.post('/home/baseinfo.json', {'flag': 1}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var starStore = resp.data.data;
			starStore.imgurl = picBasePath + starStore.imgurl;
			$scope.starStore = starStore;
		}
		
	}, function (resp) {
		// alert('数据请求失败!请稍后再试');
	});

	// 悦尚城
	$http.post('/home/baseinfo.json', {'flag': 2}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var mall = resp.data.data;
			mall.imgurl = picBasePath + mall.imgurl;
			$scope.mall = mall;
		}
	}, function (resp) {
		// alert('数据请求失败!请稍后再试');
	});

	// 明星造型师
	$http.post('/home/stardesigner.json', {'areaid': 1}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var starDesigner = resp.data.data.designerlist;
			for (var i = 0, j = starDesigner.length; i < j; i++) {
				starDesigner[i].imgurl = picBasePath + starDesigner[i].imgurl;
			}
			$scope.starDesigner = starDesigner;
			console.log($scope.starDesigner);
		}
	}, function (resp) {
		console.log(resp);
		// alert('数据请求失败!请稍后再试');
	});

	// 时尚发型列表
	$http.post('/home/fashionhair.json', {'page': 1}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var fashionHairList = resp.data.data.fashionhairlist;
			for (var i = 0, j = fashionHairList.length; i < j; i++) {
				fashionHairList[i].imgurl = picBasePath + fashionHairList[i].imgurl;
			}
			$scope.fashionHairList = fashionHairList;
			console.log($scope.fashionHairList);
		}
	}, function (resp) {
		console.log(resp);
		// alert('数据请求失败!请稍后再试');
	});
	
}]);