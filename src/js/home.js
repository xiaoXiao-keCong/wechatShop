/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('homeCtrl',
	['$scope', '$http', '$window', '$location', '$q',
	function ($scope, $http, $window, $location, $q) {

	// 时尚资讯promise
    $scope.flashSaleDeferred = $q.defer();

    $scope.$on('flashSaleRepeatFinished', function () {
        $scope.flashSaleDeferred.resolve('succeed');
    });

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

	// 轮播图是否加载完毕的promise
	$scope.deferred = $q.defer();
	// 明星发型师是否加载完毕的promise
	$scope.designerDeferred = $q.defer();

	// 获取所有城市
	$http.post('/home/arealist.json', postCfg)
	.success(function (data) {
		console.log(data);
	})
	.error(function (data) {
		console.log(data);
		alert('数据请求失败，请稍后再试！');
	});

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
		alert('数据请求失败!请稍后再试');
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
			var starDesigners = resp.data.data.designerlist;
			for (var i = 0, j = starDesigners.length; i < j; i++) {
				starDesigners[i].imgurl = picBasePath + starDesigners[i].imgurl;
			}
			$scope.starDesigners = starDesigners;
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
		}
	}, function (resp) {
		console.log(resp);
		// alert('数据请求失败!请稍后再试');
	});

	// 时尚资讯列表
	$http.post('/home/fashionnews.json', {'sort': 'recommend'}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var fashionNewsList = resp.data.data.fashionnewslist;
			for (var i = 0, j = fashionNewsList.length; i < j; i++) {
				fashionNewsList[i].imgurl = picBasePath + fashionNewsList[i].imgurl;
			}
			$scope.fashionNewsList = fashionNewsList;
			console.log($scope.fashionNewsList);
		}
	}, function (resp) {
		console.log(resp);
	});
	
	// 跳转到时尚发型详情
	$scope.showHairInfo = function (hair) {
		$location.path('fashion_hair_info/' + hair.id);
	};

	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});
	$scope.$on('designerRepeatFinished', function () {
		$scope.designerDeferred.resolve('succeed');
	});

	// 明星造型师点击跳转
	$scope.toDesigner = function (designer) {
		$location.path('stylist_detail/' + designer.designerid);
	};

	// 跳转到时尚资讯
	$scope.toFashionNews = function (news) {
		console.log(news);
		$window.location.href = news.jumpurl;
	};
}]);