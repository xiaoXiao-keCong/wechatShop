/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('goodsDetailImgCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	(function init() {
		var url = $location.search().url;
		$scope.imgurl = url;
	})();
	


}]);