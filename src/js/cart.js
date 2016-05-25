/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('cartCtrl',
	['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {

	var cartPromise = $http.post('/user/mycart.json', postCfg);
	cartPromise.then(function (resp) {
		console.log(resp);
		var data = resp.data;
		if (-1 === data.code) {
			// 用户未登录
			$rootScope.preUrl = $location.url();
			$location.path('login');
		}
		else if (1 === data.code && 0 < data.data.cartlist.length) {
			var cartList = data.data.cartlist;
			for (var i =0, j  = cartList.length; i < j; i++) {
				cartList[i].goods.imgurl = picBasePath + cartList[i].goods.imgurl1;
				cartList[i].count = cartList[i].price * cartList[i].num;
			}
			$scope.cartList = cartList;
		}
	}, function (resp) {
		console.log(resp);
	});

	// 增加商品购物车数量
	$scope.increaseNum = function (goods) {
		var data = {
			'goodsid': [parseInt(goods.goods.id)],
			'number': [parseInt(goods.num) + 1]
		};
		$http.post('/user/changecart.json', data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				var cartList = resp.data.data.cartlist;
				for (var i =0, j  = cartList.length; i < j; i++) {
					cartList[i].goods.imgurl = picBasePath + cartList[i].goods.imgurl1;
					cartList[i].count = cartList[i].price * cartList[i].num;
				}
				$scope.cartList = cartList;

			}
		}, function (resp) {
			console.log(resp);
		});
	};
	// 减少商品购物车数量
	$scope.decreaseNum = function (goods) {
		if (0 === goods.num) {
			return;
		}
		var data = {
			'goodsid': [parseInt(goods.goods.id)],
			'number': [parseInt(goods.num) - 1]
		};
		$http.post('/user/changecart.json', data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				var cartList = resp.data.data.cartlist;
				for (var i =0, j  = cartList.length; i < j; i++) {
					cartList[i].goods.imgurl = picBasePath + cartList[i].goods.imgurl1;
					cartList[i].count = cartList[i].price * cartList[i].num;
				}
				$scope.cartList = cartList;
			}
		}, function (resp) {
			console.log(resp);
		});
	};
}]);