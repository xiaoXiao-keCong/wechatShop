/**
 * Created by hugotan on 2016/5/4.
 * @brief 商品评价
 */
index.controller('orderCommentCtrl',
	['$scope', '$http', '$location', function ($scope, $http, $location) {
	var goodsId = 2;
	// 获取商品详情
	$http.post('/shop/getgoodsbyid.json', {id: goodsId}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var goods = resp.data.data;
			for (var i = 0, j = goods.imgarray.length; i < j; i++) {
				goods.imgarray[i].imgurl = picBasePath + goods.imgarray[i].imgurl;
			}
			$scope.goods = goods;
			console.log($scope.goods);
			
		}
	}, function (resp) {
		console.log(resp);
	});
}]);