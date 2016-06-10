/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('mallCtrl',
    ['$scope', '$http', '$location', '$q', '$window',
    function ($scope, $http, $location, $q, $window) {
	
	
    // 广告promise
    $scope.deferred = $q.defer();
    // 限时抢购promise
    $scope.flashSaleDeferred = $q.defer();


    $scope.$on('ngRepeatFinished', function () {
        $scope.deferred.resolve('succeed');
    });
    $scope.$on('flashSaleRepeatFinished', function () {
        $scope.flashSaleDeferred.resolve('succeed'); 
    });

    function init() {
        // 获取商城广告
        $http.post('/shop/getshopad.json', postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                var adList = resp.data.data.shopadvertisementlist;
                for (var i = 0, j = adList.length; i < j; i++) {
                    adList[i].imgurl = picBasePath + adList[i].imgurl;
                }
                $scope.adList = adList;
            }
        }, function (resp) {
            console.log(resp);
        });
        // 获取首页目录
        $http.post('/shop/getshopmenu.json', postCfg)
        .then(function (resp) {
            // console.log(resp);
        }, function (resp) {
            console.log(resp);
        });
        // 限时抢购
        $http.post('/shop/getflashsale.json', {'page': 1}, postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                var flashSaleList = resp.data.data.goodslist;
                $scope.limitStartTime = resp.data.data.starttime;
                $scope.limitEndTime = resp.data.data.endtime;
                for (var i = 0, j = flashSaleList.length; i < j; i++) {
                    flashSaleList[i].imgurl = picBasePath + flashSaleList[i].imgurl1;
                }
                $scope.flashSaleList = flashSaleList;
            }
        }, function (resp) {
            console.log(resp);
        });
        // 品牌专区
        $http.post('/shop/getshopbrand.json', postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                var brandList = resp.data.data.goodskindlist;
                for (var i = 0, j = brandList.length; i < j; i++) {
                    brandList[i].imgurl = picBasePath + brandList[i].imgurl;
                }
                $scope.brandList = brandList;
            }
        }, function (resp) {
            console.log(resp);
        });
        // 热销排序产品
        $http.post('/shop/searchgoodsbycondition.json',
            {'page': 1, 'sort': 'hot'}, postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                var goodsList = resp.data.data.goodslist;
                for (var i = 0, j = goodsList.length; i < j; i++) {
                    goodsList[i].detailimgurl = picBasePath + goodsList[i].imgurl1;
                }
                $scope.goodsList = goodsList;
                console.log($scope.goodsList);
            }
        }, function (resp) {
            console.log(resp);
        });
    }

    init();

    // 广告图片跳转事件
    $scope.jump = function (ad) {
        $window.location.href = ad.jumpurl;
    };

    // 跳转到商品详情
    $scope.toGoodsDetail = function (goods) {
        $location.path('mall_goods_detail/' + goods.id);
    };

    // 跳转到购物车
    $scope.toCart = function () {
        $location.path('cart');
    };

    // 跳转到商品搜索页面
    $scope.searchGoods = function () {
        $location.path('mall_search');
    };
    
}]);