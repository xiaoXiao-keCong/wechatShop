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
        console.log(hairInfo);
    	// 首先判断是否登录
    	if (sessionStorage.user) {
            if (hairInfo.alreadypraise === true) {
                // 取消点赞
                $http.post('/home/fashionhair/unpraise.json', {'fashionhairid': hairInfo.id}, postCfg)
                .then(function (resp) {
                    if (-1 === resp.data.code) {
                        // 用户未登录
                        sessionStorage.removeItem('user');
                        $timeout(function () {
                            alert('请先登录!');
                        }, 0);
                        $location.path('login');
                    }
                    else if (1 === resp.data.code) {
                        setHairInfo();
                        alert('取消点赞成功!');
                    }
                }, function (resp) {
                    console.log(resp);
                });
            }
            else {
                // 点赞
                $http.post('/home/fashionhair/praise.json', {'fashionhairid': hairInfo.id}, postCfg)
                .then(function (resp) {
                    if (-1 === resp.data.code) {
                        // 用户未登录
                        sessionStorage.removeItem('user');
                        $timeout(function () {
                            alert('请先登录!');
                        }, 0);
                        $location.path('login');
                    }
                    else if (1 === resp.data.code) {
                        setHairInfo();
                        alert('点赞成功!');
                    }
                }, function (resp) {
                    console.log(resp);
                });
            }
    	}
    	else {
    		$location.path('login');
    	}
    };

}]); 