index.controller('aboutusCtrl',
	['$scope', '$http', '$location', '$rootScope', '$q', '$window',
	function ($scope, $http, $location, $rootScope, $q, $window) {

	// 获取相关信息
	var data = {
		'flag': 6
	};
	var loading = weui.loading('加载中');
	$http.post('/home/baseinfolist.json', data, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			console.log(resp);
			var baseinfoList = resp.data.data.baseinfolist;
			for(var i=0;i<baseinfoList.length;i++){
				baseinfoList[i].imgurl = picBasePath + baseinfoList[i].imgurl;
			}
			$scope.baseinfoList = baseinfoList;
		}
		loading.hide();
	}, function (resp) {
		// alert('数据请求失败，请稍后再试！');
	});
	$scope.jump = function (ad) {
        $window.location.href = ad.jumpurl;
    };
}]);