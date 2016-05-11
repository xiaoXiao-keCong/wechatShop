/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('fashionHairInfoCtrl', ['$scope', '$window', '$http', '$location', '$routeParams',
	function ($scope, $window, $http, $location, $routeParams) {

    $http.post('/home/fashionhair/info.json', {'fashionhairid': $routeParams.hairId}, postCfg)
    .then(function (resp) {
    	var hairInfo = resp.data;
    	hairInfo.imgurl = picBasePath + hairInfo.imgurl;
    	$scope.hairInfo = hairInfo;
    }, function (resp) {
    	console.log(resp);
    });

    // 点赞操作，包括点赞和取消点赞
    $scope.praiseOperation = function (hairInfo) {
    	console.log(hairInfo);
    	// 首先判断是否登录
    	if (sessionStorage.user) {
    		
    	}
    	else {
    		$location.path('login');
    	}
    };

}]); 