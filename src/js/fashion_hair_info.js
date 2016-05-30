/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('fashionHairInfoCtrl', ['$scope', '$window', '$http', '$location', '$routeParams', '$timeout',
	function ($scope, $window, $http, $location, $routeParams, $timeout) {

    function setHairInfo() {
        $http.post('/home/fashionhair/info.json', {'fashionhairid': $routeParams.hairId}, postCfg)
        .then(function (resp) {
            var hairInfo = resp.data;
            hairInfo.imgurl = picBasePath + hairInfo.imgurl;
            $scope.hairInfo = hairInfo;
        }, function (resp) {
            console.log(resp);
        });
    }
    setHairInfo();

    // 点赞操作，包括点赞和取消点赞
    $scope.praiseOperation = function (hairInfo) {
    	var postUrl = hairInfo.iskeep ? '/home/fashionhair/unkeep.json' : '/home/fashionhair/keep.json';
        $http.post(postUrl, {'fashionhairid': parseInt(hairInfo.id)}, postCfg)
        .then(function (resp) {
            console.log(resp);
            if (-1 === resp.data.code) {
                // 用户未登录
                sessionStorage.removeItem('user');
                $location.path('login');
            }
            else if (1 === resp.data.code) {
                setHairInfo();
            }
        }, function (resp) {
            console.log(resp);
        });
    };

}]); 