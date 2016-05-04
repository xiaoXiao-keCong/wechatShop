/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('pointMallCtrl',
	['$scope', '$http', '$location', function ($scope, $http, $location) {
	$scope.toGoodsDetail = function () {
		$location.path('point_goods_detail');
	};
}]);