index.controller('orderDetailCtrl',
	['$scope', '$http', '$window', '$location','$q','$rootScope', function ($scope, $http, $window, $location,$q,$rootScope) {
    
    // 获取订单信息
    $scope.order=$rootScope.orderDetail;
	var goodslist=$scope.order.goodslist;
    for(var i=0;i<goodslist.length;i++){
        goodslist[i].imgurl=picBasePath + goodslist[i].imgurl;
    }
    $scope.goodslist=goodslist;

    // 计算剩余支付时间
    $scope.remainingTime='';
    // console.log($scope.order);
    var now = new Date(); 
    var startDate = new Date($scope.order.time);
    var leftTime=now.getTime()-startDate.getTime();
    var leftsecond = parseInt((leftTime)/1000); 
    //var day1=parseInt(leftsecond/(24*60*60*6)); 
    var day1=Math.floor(leftsecond/(60*60*24)); 
    var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
    var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
    var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
    $scope.remainingTime=parseInt(30-minute)+'分钟';
    // 取消订单
    $scope.cancelOrder = function (){
        var data = {
            'orderid': $scope.order.id,
            'page':$scope.order.page,
            'flag':$scope.order.flag
        };
        var confirm = $window.confirm('确认取消此订单吗？');
        if (confirm) {
            $http.post('/order/ordercancel.json', data, postCfg)
            .success(function (data) {
                if (1 === data.code) {
                    // 取消成功
                    alert('取消成功！');
                    $window.history.back();
                }
                else if (0 === data.code) {
                    alert(data.reason);
                    return;
                }
            })
            .error(function (data) {
                // alert('数据请求失败，请稍后再试！');
            });
        }
    };
    // 付款
    $scope.orderConfirm = function (){
        var predata = {
            type: 'wz',
            orderid: $scope.order.id
        };
        $http.post('/pay/prepay.json', predata, postCfg)
        .success(function (resp) {
            // console.log(resp);
            if (1 === resp.code) {
                // 预支付成功
                var data = resp.data;
                if (WeixinJSBridge) {
                    WeixinJSBridge.invoke(
                       'getBrandWCPayRequest', {
                           "appId": data.appId,     //公众号名称，由商户传入     
                           "timeStamp": data.timeStamp.toString(),         //时间戳，自1970年以来的秒数     
                           "nonceStr": data.nonceStr, //随机串     
                           "package": data.package,     
                           "signType": data.signType,         //微信签名方式    
                           "paySign": data.paySign //微信签名 
                       },
                       function(res) {
                           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                               // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                               alert('支付成功');
                               $rootScope.activeTab = 3;
                               $location.path('order');
                           }
                           else {
                               alert('支付失败' + res.err_msg);
                           }
                       }
                   );
                }
            }
            else if (0 === resp.code) {
                alert(resp.reason);
            }
        })
        .error(function (resp) {
            // alert('数据请求失败!请稍后再试！');
        });
    };
    $scope.logistics = function (){
        
    };
}]);