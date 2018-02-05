index.controller('helpcenterCtrl',
	['$scope', '$http', '$location', '$rootScope', '$q', '$window',
	function ($scope, $http, $location, $rootScope, $q, $window) {

	

	// 增加商品购物车数量
	// $scope.increaseNum = function (goods) {
	// 	var index = $scope.cartList.indexOf(goods),
	// 	    data = {
	// 		'goodsid': [parseInt(goods.goods.id)],
	// 		'number': [parseInt(goods.num) + 1]
	// 	};
	// 	$http.post('/user/changecart.json', data, postCfg)
	// 	.then(function (resp) {
	// 		if (1 === resp.data.code) {
	// 			var cartList = resp.data.data.cartlist;
	// 			$scope.cartList[index].num = cartList[index].num;
	// 			// $scope.cartList[index].count = cartList[index].price * cartList[index].num;
	// 			$scope.cartList[index].count = addNum(cartList[index].price, cartList[index].num);
	// 		}
	// 	}, function (resp) {
	// 		// alert('数据请求失败，请稍后再试！');
	// 	});
	// };
}]);