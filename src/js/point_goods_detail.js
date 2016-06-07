/**
 * Created by hugotan on 2016/5/2.
 */
index.controller('pointGoodsDetailCtrl',
	['$scope', '$http', '$location', '$q', '$routeParams',
    function ($scope, $http, $location, $q, $routeParams) {
   // 购买数量默认为1
    $scope.buyNum = 1;
    $scope.deferred = $q.defer();
    var goodsId = parseInt($routeParams.id);

    // 获取积分商品详情
    $http.post('/integralshop/getgoodsbyid.json', {id: goodsId}, postCfg)
    .then(function (resp) {
        if (1 === resp.data.code) {
            var goods = resp.data.data;
            for (var i = 0, j = goods.imgarray.length; i < j; i++) {
                goods.imgarray[i].imgurl = picBasePath + goods.imgarray[i].imgurl;
            }
            $scope.goods = goods;
            console.log(goods);
        }
    }, function (resp) {
        console.log(resp);
    });

    // 点赞商品，index为1执行点赞，index为2执行取消点赞
    $scope.praiseOperation = function (index) {
        var postUrl = index === 1 ? '/user/keepgoods.json' : '/user/unkeepgoods.json';
        $http.post(postUrl, {goodsid: goodsId}, postCfg)
        .success(function (data) {
            console.log(data);
            if (-1 === data.code) {
                $location.path('login');
            }
            else if (1 === data.code) {
                $scope.goods.iskeep = index === 1 ? true : false;
            }
        })
        .error(function (data) {
            console.log(data);
        });
    };

    // 跳转到购物车界面
    $scope.toCart = function () {
        $location.path('cart');
    };

    $scope.$on('ngRepeatFinished', function () {
        $scope.deferred.resolve('succeed');
    });
}]);