index.controller('classificationCtrl',
    ['$scope', '$http', '$location', '$q', '$window','$rootScope',
    function ($scope, $http, $location, $q, $window,$rootScope) {
	
    $scope.goodsList=[];
    (function init() {
        var loading = weui.loading('加载中');
        // 获取主题信息
        $http.post('/vip/home.json', postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                // console.log(resp);
                $scope.topimg = picBasePath + resp.data.data.topimg;
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
        $scope.user = JSON.parse(sessionStorage.getItem('user'));
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

    
    $scope.buyvip = function () {
        $location.path('buyvip');
        
    };
    
    $scope.navigate = function (index) {
        var user;
        switch (index) {
            case 1:
                $location.path('/');
                break;
            case 2:
                $location.path('classification');
                break;
            case 3:
                $location.path('cart');
                break;
            case 4:
                $location.path('my');
                break;
        }
    };
    
}]);