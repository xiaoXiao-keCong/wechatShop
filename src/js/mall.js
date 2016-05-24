/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('mallCtrl',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
	
	$scope.toCart = function () {
		$location.path('cart');
	};
    $scope.toDetail = function () {
        $location.path('mall_goods_detail');
    };

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
            // console.log(resp);
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
                    goodsList[i].detailimgurl = picBasePath + goodsList[i].imgurl;
                }
                $scope.goodsList = goodsList;
            }
        }, function (resp) {
            console.log(resp);
        });
    }

    init();
    
}]);