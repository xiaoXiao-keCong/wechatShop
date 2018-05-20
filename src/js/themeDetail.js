index.controller('themeDetailCtrl',
	['$scope', '$http', '$routeParams', '$window', '$location', '$rootScope', '$q',
	function ($scope, $http, $routeParams, $window, $location, $rootScope, $q) {

	var themeId = parseInt($routeParams.id);
    $scope.themeId = themeId;
	$scope.goodsList=[];
	(function init() {
        var loading = weui.loading('加载中');
		// 获取主题信息
		$http.post('/theme/getbaseinfo.json', {themeid: themeId}, postCfg)
		.then(function (resp) {
			// console.log(resp);
			if (1 === resp.data.code) {
				var theme = resp.data.data;
				theme.imgurl = picBasePath + theme.imgurl;
				$scope.theme = theme;
			}
		}, function (resp) {
			// alert('数据请求失败，请稍后再试！');
		});
		// 获取主题商品详情
		$http.post('/theme/getgoods.json', {themeid: themeId}, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				console.log(resp);
				var goodsList = resp.data.data.goodslist;
                if (goodsList.length > 0) {
                    for (var i = 0, j = goodsList.length; i < j; i++) {
                        goodsList[i].imgurl = picBasePath + goodsList[i].imgurl;
                        $scope.goodsList.push(goodsList[i]);
                    }
                }
			}
            loading.hide();
		}, function (resp) {
			// alert('数据请求失败，请稍后再试！');
		});
	})();
	// 点赞商品
    $scope.praise = function (goods, e) {
        e.stopPropagation();
        var loading = weui.loading('提交中');
        var url = goods.keep ? '/user/unkeepgoods.json' : '/user/keepgoods.json';
        $http.post(url, {goodsid: goods.id}, postCfg)
        .success(function (data) {
            // console.log(data);
            if (-1 === data.code) {
                $location.path('fast_login').search({});
            }
            else if (1 === data.code) {
                if (!goods.keep) {
                    goods.keep = true;
                }
                else {
                    goods.keep = false;
                }
            }
            loading.hide();
        })
        .error(function (data) {
            // alert('数据请求失败，请稍后再试！');
        });
    };
    $scope.toGoodsDetail = function (goods) {
        $location.path('mall_goods_detail/' + goods.id);
        
    };
}]);