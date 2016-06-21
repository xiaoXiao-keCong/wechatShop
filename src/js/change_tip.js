/**
 * Created by hugotan on 2016/5/2.
 */
index.controller('changeTipCtrl',
	['$scope', '$http', '$location',
	function ($scope, $http, $location) {
	
	(function init() {
		$scope.orderId = $location.search().orderId;
		$scope.title = $location.search().type === 'pay' ? '支付成功' : '兑换成功';
		$scope.tips = $location.search().type === 'pay' ? '支付成功！' : '恭喜您兑换成功！';

	})();

	// 购买成功后商品推荐
	function getRecommendation() {
		var data = {

		};
		$http.post('/shop/recommendgoodsafterpay.json', data, postCfg)
		.success(function (data) {
			console.log(data);
		})
		.error(function () {
			alert('数据请求失败，请稍后再试！');
		});
	}

	// 查看订单
	$scope.orderDetail = function () {
		$location.path('orderDetail/' + $scope.orderId).search({});
	};
	
}]);