/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('mallSearchCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	// 首页搜索
	$scope.search = function () {
		var data = {
			kind: 'goods',
			q: $scope.word,
			page: 1,
			// areaid: 
		};
		$http.post('/home/search.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (1 === data.code) {
				var goodsList = data.data.goodslist,
				    starUrl1 = '../../assets/images/star_h.png',
		            starUrl2 = '../../assets/images/star.png',
		            i, j, k;
				for (i = 0; i < goodsList.length; i++) {
					goodsList[i].img = picBasePath + goodsList[i].imgarray[0].imgurl;
				}
				$scope.goodsList = goodsList;
			}
		})
		.error(function (data) {
			console.log(data);
		});
	};

	// 跳转到商品详情
	$scope.toGoodsDetail = function (goods) {
		$location.path('mall_goods_detail/' + goods.id);
	};
}]);