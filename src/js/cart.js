/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('cartCtrl',
	['$scope', '$http', '$location', '$rootScope', '$q', function ($scope, $http, $location, $rootScope, $q) {

	var cartPromise = $http.post('/user/mycart.json', postCfg);
	cartPromise.then(function (resp) {
		var data = resp.data;
		console.log(data);
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
				cartList[i].selected = false;
			}
			$scope.cartList = cartList;
			// 获取合计总价
			$scope.getTotalPrice = function () {
				var totalPrice = 0;
				for (var i = 0, j = $scope.cartList.length; i < j; i++) {
					if ($scope.cartList[i].selected === true) {
						totalPrice += parseFloat(cartList[i].count);
					}
				}
				return totalPrice;
			};
		}
	}, function (resp) {
		console.log(resp);
	});

	// 增加商品购物车数量
	$scope.increaseNum = function (goods) {
		var index = $scope.cartList.indexOf(goods),
		    data = {
			'goodsid': [parseInt(goods.goods.id)],
			'number': [parseInt(goods.num) + 1]
		};
		$http.post('/user/changecart.json', data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				var cartList = resp.data.data.cartlist;
				$scope.cartList[index].num = cartList[index].num;
				$scope.cartList[index].count = cartList[index].price * cartList[index].num;
			}
		}, function (resp) {
			console.log(resp);
		});
	};
	// 减少商品购物车数量
	$scope.decreaseNum = function (goods) {
		if (1 === goods.num) {
			return;
		}
		var index = $scope.cartList.indexOf(goods);
		    data = {
			'goodsid': [parseInt(goods.goods.id)],
			'number': [parseInt(goods.num) - 1]
		};
		$http.post('/user/changecart.json', data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				var cartList = resp.data.data.cartlist;
				$scope.cartList[index].num = cartList[index].num;
				$scope.cartList[index].count = cartList[index].price * cartList[index].num;
			}
		}, function (resp) {
			console.log(resp);
		});
	};

	$scope.selectAll = function () {
		$scope.isSelectAll = !$scope.isSelectAll;
		var i = 0, j = 0;
		if ($scope.isSelectAll === true) {
			// 遍历购物车的商品，选中状态设置为true
			for (i = 0, j = $scope.cartList.length; i < j; i++) {
				$scope.cartList[i].selected = true;
			}
		}
		else {
			// 遍历购物车的商品，选中状态设置为false
			for (i = 0, j = $scope.cartList.length; i < j; i++) {
				$scope.cartList[i].selected = false;
			}
		}
	};

	// 检查是否全部选中了
	function checkSelectAll() {
		for (var i = 0, j = $scope.cartList.length; i < j; i++) {
			if ($scope.cartList[i].selected === false) {
				return false;
			}
		}
		return true;
	};

	// 点击购物车中的商品选中按钮
	$scope.selectGoods = function (goods) {
		goods.selected = !goods.selected;
		$scope.isSelectAll = checkSelectAll();
	};

	// 点击去结算，跳转到订单确认页面
	$scope.calculate = function () {
		console.log($scope.cartList);
		var goodsArr = [];
		var numArr = [];
		var flag = 0;    // 代表购物车是否有商品被选中
		for (var i = 0; i < $scope.cartList.length; i++) {
			if ($scope.cartList[i].selected) {
				$scope.cartList[i].goods.buyNum = $scope.cartList[i].num;
				$scope.cartList[i].goods.price = $scope.cartList[i].price;
				goodsArr.push($scope.cartList[i].goods);
				numArr.push($scope.cartList[i].num);
				flag = 1;
			}
		}
		if (flag == 0) {
			alert('请先选择商品!');
			return;
		}
		$rootScope.goodsArr = goodsArr;
		$rootScope.numArr = numArr;
		$rootScope.cartFlag = 1;
		$location.path('order_confirm');
	};

}]);