/**
 * Created by hugotan on 2016/5/1.
 */
index.controller('orderDetailCtrl', ['$scope', '$http', '$location', '$routeParams',
	function ($scope, $http, $location, $routeParams) {
	
	var orderId = $routeParams.id;
	// 获取订单详情
	$http.post('/user/goodsorderdetail.json', {id: orderId}, postCfg)
	.success(function (data) {
		console.log(data);
		if (1 === data.code) {
			var order = data.data;
			for (var i = 0; i < order.goodslist.length; i++) {
				order.goodslist[i].imgurl = picBasePath + order.goodslist[i].imgurl;
			}
			$scope.order = order;
		}
	})
	.error(function (data) {
		alert('数据请求失败，请稍后再试！');
	});
}]);