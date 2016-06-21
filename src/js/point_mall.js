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
                console.log($scope.flashSaleList);
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
        $http.post('/integralshop/searchgoodsbycondition.json',
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
	})();

    // 跳转到积分商城搜索
    $scope.pointMallSearch = function () {
        $location.path('point_mall_search');
    };
}]);