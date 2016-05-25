/**
 * Created by hugotan on 2016/5/1.
 */
index.controller('mallGoodsDetailCtrl',
	['$scope', '$http', '$routeParams', '$window', '$location', '$rootScope',
	function ($scope, $http, $routeParams, $window, $location, $rootScope) {

	var goodsId = $routeParams.id;
	// 获取商品详情
	$http.post('/shop/getgoodsbyid.json', {'id': goodsId}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			console.log(resp.data.data);
			var goods = resp.data.data;
			// for (var i = 1; i <= 6; i++) {
			// 	if (goods['imgurl' + i] !== '') {
			// 		goods['imgurl' + i] = picBasePath + goods['imgurl' + i];
			// 	}
			// }
			$scope.goods = goods;
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

	};

}]);