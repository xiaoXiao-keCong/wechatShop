/**
 * Created by hugotan on 2016/8/11.
 */
index.controller('coinGoodsCtrl',
	['$scope', '$http', '$location', '$window', '$q',
	function ($scope, $http, $location, $window, $q) {
	
	$scope.deferred = $q.defer();

	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});

	(function init() {
		var id = $location.search().id;
		// 通过id获取商品详情
		$http.post('/integralshop/integral/getgoods.json', {id: id}, postCfg)
		.success(function (resp) {
			// type表示商品类型：1为正常商品，2为限时抢购，3为积分正常商品
			// 4为积分虚拟商品（需要有快递单号），5为积分服务项目（订单id单独生成）
			if (1 === resp.code) {
				var goods = resp.data;
				for (var i = 0; i < goods.imgarray.length; i++) {
					goods.imgarray[i].imgurl = picBasePath + goods.imgarray[i].imgurl;
				}
				$scope.goods = goods;
				console.log(goods);
			}
			else if (0 === resp.code) {
				alert(resp.reason);
			}
		})
		.error(function (resp) {
			alert('数据请求失败，请稍后再试！');
		});
	})();	
}]);