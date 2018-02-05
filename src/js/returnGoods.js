index.controller('returnGoodsCtrl',
	['$scope', '$http', '$window', '$location','$q','$rootScope', function ($scope, $http, $window, $location,$q,$rootScope) {
    
    // 获取退货订单信息
    $scope.order=$rootScope.returnGoods;
    $scope.selectedGoodsid=[];
    var goodslist=$scope.order.goodslist;
    for(var i=0;i<goodslist.length;i++){
        goodslist[i].selected = false;
        goodslist[i].count = addNum(goodslist[i].price, goodslist[i].num);
        goodslist[i].imgurl = picBasePath + goodslist[i].imgurl;
    }
    $scope.goodsList=goodslist;
	// 点击购物车中的商品选中按钮
    $scope.selectGoods = function (goods) {
        goods.selected = !goods.selected;
        $scope.selectedGoodsid=[];
        for (var i = 0, j = $scope.goodsList.length; i < j; i++) {
            if ($scope.goodsList[i].selected === true) {
                $scope.selectedGoodsid.push($scope.goodsList[i].goodsorderid);
            }
        }
    };
    // 获取合计总价
    $scope.getTotalPrice = function () {
        var totalPrice = 0;
        for (var i = 0, j = $scope.goodsList.length; i < j; i++) {
            if ($scope.goodsList[i].selected === true) {
                totalPrice += parseFloat($scope.goodsList[i].count);
            }
        }
        return totalPrice;
    };

    function addNum (num, count) {
        var sq;
        try {
            sq = num.toString().split(".")[1].length;
        }
        catch (e) {
            sq = 0;
        }
        var m = Math.pow(10, sq);
        return (num * m * count) / m;
    }

    // 确认退款
    $scope.confirmReturn = function (){
        data = {
            'orderid': $scope.order.id,
            'flag': $scope.order.flag,
            'page': $scope.order.page,
            'goodsorderid': $scope.selectedGoodsid
        };
        $http.post('/order/orderrefund.json', data, postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                alert('退货申请提交成功，我们将尽快为您处理该申请！');
                $location.path('order');
            }
        }, function (resp) {
            alert(resp);
        });
    };
}]);