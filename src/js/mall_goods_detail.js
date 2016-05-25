/**
 * Created by hugotan on 2016/5/1.
 */
index.controller('mallGoodsDetailCtrl',
	['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

	var goodsId = $routeParams.id;
	// 获取商品详情
	$http.post('/shop/getgoodsbyid.json', {'id': goodsId}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			console.log(resp.data.data);
			// var goods = resp.data.data;
			// for (var i = 1; i <= 6; i++) {
			// 	if (goods['imgurl' + i] !== '') {
			// 		goods['imgurl' + i] = picBasePath + goods['imgurl' + i];
			// 	}
			// }
			// $scope.goods = goods;
			console.log($scope.goods);
		}
	}, function (resp) {
		console.log(resp);
	});
}]);