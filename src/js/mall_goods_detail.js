/**
 * Created by hugotan on 2016/5/1.
 */
index.controller('mallGoodsDetailCtrl',
	['$scope', '$http', '$routeParams', '$window', '$location', '$rootScope', '$q',
	function ($scope, $http, $routeParams, $window, $location, $rootScope, $q) {

	// 购买数量默认为1
	$scope.buyNum = 1;
	$scope.deferred = $q.defer();

	var goodsId = $routeParams.id;
	// 获取商品详情
	$http.post('/shop/getgoodsbyid.json', {'id': goodsId}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var goods = resp.data.data;
			for (var i = 0, j = goods.imgarray.length; i < j; i++) {
				goods.imgarray[i].imgurl = picBasePath + goods.imgarray[i].imgurl;
			}
			$scope.goods = goods;
			console.log(goods);
		}
	}, function (resp) {
		console.log(resp);
	});

	$scope.toGuarantee = function () {
		$window.location.href = $scope.goods.yueurl;
	};

	// 加进购物车
	$scope.addToCart = function () {
		if (!sessionStorage.user) {
			// 未登录，跳转到登录页面，将当前页面url存储到rootScope中
			$rootScope.preUrl = $location.url();
			$location.path('login');
		}
		else {
			// 用户已经登录，添加商品到购物车
			var data = {
				'goodsid': parseInt(goodsId),
				'number': 1
			};
			$http.post('/user/addtocart.json', data, postCfg)
			.then(function (resp) {
				if (1 === resp.data.code) {
					// 添加进购物车成功
					alert('商品添加购物车成功！');
				}
				else if (-1 === resp.data.code) {
					// 用户未登录
					$rootScope.preUrl = $location.url();
					$location.path('login');
				}
			}, function (resp) {
				console.log(resp);
			});

		}
	};

	// 立即购买
	$scope.buy = function () {
		$scope.isBuy = true;
	};

	// 取消购买
	$scope.cancelBuy = function () {
		$scope.isBuy = false;
	};


	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});
	$scope.confirmBuy = function () {
		console.log('确认购买');
		$location.path('order_confirm');
	};

	// 改变购买数量
	$scope.changeBuyNum = function (type) {
		switch (type) {
			case 1:
				// 减少数量
				if (1 !== $scope.buyNum) {
					$scope.buyNum--;
				}
				break;
			case 2:
				// 增加数量
				if ($scope.buyNum != $scope.goods.inventory) {
					$scope.buyNum++;	
				}
				break;
		}
	};

}]);