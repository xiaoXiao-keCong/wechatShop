/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('selectCityCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	

	(function init() {
		// 获取城市列表
		$http.post('/home/arealist.json', postCfg)
		.success(function (data) {
			console.log(data);
			if (1 === data.code) {
				$scope.areaList = data.data.arealist;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	})();

	$scope.selectCity = function (city) {
		localStorage.setItem('cityId', city.id);
		localStorage.setItem('cityName', city.name);
		$window.history.back();
	};
}]);