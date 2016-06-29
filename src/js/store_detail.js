/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('storeDetailCtrl',
	['$scope', '$http', '$location', '$routeParams', '$q', '$window',
	function ($scope, $http, $location, $routeParams, $q, $window) {
	var storeId = $routeParams.store_id;
	$scope.deferred = $q.defer();
	$scope.activityDeferred = $q.defer();

	// 根据id获取门店信息
	$http.post('/store/info.json', {storeid: storeId}, postCfg)
	.success(function (data) {
		if (1 === data.code) {
			var store = data.data,
				starUrl1 = '../../assets/images/star_h.png',
                starUrl2 = '../../assets/images/star.png';
			store.imgs = [];
			store.starUrl = [];
			for (var i = 2; i < 6; i++) {
				store.imgs.push({'path': picBasePath + store.imgurl[i]});
			}
			for (i = 0; i < store.star; i++) {
	            store.starUrl.push({'path': starUrl1});
	        }
	        for (var j = i; j < 5; j++) {
	            store.starUrl.push({'path': starUrl2});
	        }
			$scope.store = store;
			console.log(store);
		}
	})
	.error(function (data) {
		console.log(data);
	});

	// 根据id获取店内活动
	$http.post('/store/activity.json', {storeid: storeId}, postCfg)
	.success(function (data) {
		if (1 === data.code) {
			var activityList = data.data.activitylist;
			for (var i = 0, j = activityList.length; i < j; i++) {
				activityList[i].imgurl = picBasePath + activityList[i].imgurl;
			}
			$scope.activityList = activityList;
		}
	})
	.error(function (data) {
		console.log(data);
		alert('数据请求失败，请稍后再试！');
	});

	// 根据id获取店内优秀发型师
	$http.post('/store/designer.json', {storeid: storeId, page: 1}, postCfg)
	.success(function (data) {
		if (1 === data.code) {
			var designerList = data.data.designerlist;
			for (var i = 0, j = designerList.length; i < j; i++) {
				designerList[i].avatar = picBasePath + designerList[i].avatar;	
			}
			$scope.designerList = designerList;
		}
	})
	.error(function (data) {
		console.log(data);
		alert('数据请求失败，请稍后再试！');
	});

	// 接受门店图片加载完的广播
	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});

	// 接受门店活动加载完的广播
	$scope.$on('activityFinished', function () {
		$scope.activityDeferred.resolve('succeed');
	});

	// 点击价目表
	$scope.showPrice = function () {
		alert('显示价目表');
	};

	// 点击店内活动
	$scope.jumpToActivity = function (activity) {
		$window.location.href = activity.jumpurl;
	};

	// 收藏或者取消收藏门店
	$scope.keepStore = function (store) {
		console.log(store);
		var postUrl = (store.iskeep === false) ? '/store/keep.json' : '/store/unkeep.json';
		$http.post(postUrl, {storeid: storeId}, postCfg)
		.success(function (data) {
			console.log(data);
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				$scope.store.iskeep = !$scope.store.iskeep;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};

	$scope.toDesignerDetail = function (designer) {
		$location.path('stylist_detail/' + designer.id);
	};

}]);