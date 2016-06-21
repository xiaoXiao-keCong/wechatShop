/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('pointMallCtrl',
	['$scope', '$http', '$location', '$q',
	function ($scope, $http, $location, $q) {

	// 广告promise
    $scope.deferred = $q.defer();
    // 限时抢购promise
    $scope.flashSaleDeferred = $q.defer();

    // 商品列表数组
    $scope.goodsList = [];
    $scope.page = 1;
    $scope.loading = false;
    $scope.loaded = false;
    $scope.type = 'hot';

    $scope.$on('ngRepeatFinished', function () {
        $scope.deferred.resolve('succeed');
    });
    $scope.$on('flashSaleRepeatFinished', function () {
        $scope.flashSaleDeferred.resolve('succeed'); 
    });

	$scope.toGoodsDetail = function (goods) {
		$location.path('point_goods_detail/' + goods.id);
	};

	(function init() {
		// 获取积分商城首页广告
		$http.post('/integralshop/getshopad.json', postCfg)
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

        // 限时抢购
        $http.post('/integralshop/getflashsale.json', {'page': 1}, postCfg)
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
        $http.post('/integralshop/getshopbrand.json', postCfg)
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
        // $http.post('/integralshop/searchgoodsbycondition.json',
        //     {'page': 1, 'sort': 'hot'}, postCfg)
        // .then(function (resp) {
        //     if (1 === resp.data.code) {
        //         var goodsList = resp.data.data.goodslist;
        //         for (var i = 0, j = goodsList.length; i < j; i++) {
        //             goodsList[i].detailimgurl = picBasePath + goodsList[i].imgurl1;
        //         }
        //         $scope.goodsList = goodsList;
        //         console.log($scope.goodsList);
        //     }
        // }, function (resp) {
        //     console.log(resp);
        // });
	})();

    // 获取商品列表
    function getGoods() {
        if ($scope.loading) {
            return;
        }
        $scope.loading = true;
        var data = {
            page: $scope.page,
            sort: $scope.type
        };
        $http.post('/integralshop/searchgoodsbycondition.json', data, postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                var goodsList = resp.data.data.goodslist;
                if (goodsList.length > 0) {
                    for (var i = 0, j = goodsList.length; i < j; i++) {
                        goodsList[i].imgurl = picBasePath + goodsList[i].imgurl1;
                        $scope.goodsList.push(goodsList[i]);
                    }
                    $scope.page += 1;
                    $scope.loading = false;
                }
                else {
                    $scope.loaded = true;
                }
            }
        }, function (resp) {
            console.log(resp);
        });
    }

    $scope.getGoods = getGoods;

     // 选择排序方式
    $scope.setSort = function (type) {
        if ($scope.type && $scope.type === type) {
            return;
        }
        $scope.type = type;
        $scope.goodsList = [];
        $scope.page = 1;
        $scope.loaded = false;
        $scope.loading = false;
        getGoods();
    };
    
    

    // 跳转到积分商城搜索
    $scope.pointMallSearch = function () {
        $location.path('point_mall_search');
    };
}]);