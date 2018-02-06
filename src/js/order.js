index.controller('orderCtrl',
	['$scope', '$http', '$window', '$location','$q','$rootScope', function ($scope, $http, $window, $location,$q,$rootScope) {
	$scope.flashSaleDeferred = $q.defer();
    $scope.$on('ngRepeatFinished', function () {
        $scope.deferred.resolve('succeed');
    });
    $scope.$on('flashSaleRepeatFinished', function () {
        $scope.flashSaleDeferred.resolve('succeed');
    });
    var mySwiper = new Swiper('.cartList',{
        autoplayDisableOnInteraction : false,/*触摸后是否停止自动播放*/ 
        direction:"horizontal",/*横向滑动*/  
        loop:false,/*形成环路（即：可以从最后一张图跳转到第一张图*/  
        pagination:"",/*分页器*/   
        autoplay:false,/*每隔3秒自动播放*/ 
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        freeMode: true,
        slidesPerView:5
    });
    $scope.activeTab=1;
    if($rootScope.activeTab){
        $scope.activeTab=$rootScope.activeTab;
    }
    $scope.changeTab = function(index){
        $scope.activeTab=index;
        switch (index) {
            case 1:
                $rootScope.activeTab = 1;
                $scope.allpage = 1; //全部订单
                $scope.noAllContainer = false;
                $scope.allOrderList = [];
                getAllOrder();
                break;
            case 2:
                $rootScope.activeTab = 2;
                $scope.dzfpage = 1; //待支付
                $scope.noDzfContainer=false;
                $scope.dzfOrderList=[];
                getDzfOrder();
                break;
            case 3:
                $rootScope.activeTab = 3;
                $scope.dfhpage = 1; //待发货
                $scope.noDfhContainer=false;
                $scope.dfhOrderList=[];
                getDfhOrder();
                break;
            case 4:
                $rootScope.activeTab = 4;
                $scope.dshpage = 1; //待收货
                $scope.noDshContainer=false;
                $scope.dshOrderList=[];
                getDshOrder();
                break;
            case 5:
                $rootScope.activeTab = 5;
                $scope.qualityList=[];//售后列表（目前为：待退款+已退款） 
                $scope.dtkpage = 1; //待退款
                $scope.dtkOrderList=[];
                $scope.noQualityContainer=false;
                getDtkOrder();
                $scope.ytkpage = 1; //已退款
                $scope.ytkOrderList=[];
                getYtkOrder();
                break;
        }
    };

    // ---------------------全部订单start------------------------------
    $scope.allpage = 1; //全部订单
    $scope.noAllContainer = false;
    $scope.allOrderList = [];
    function getAllOrder(){
        var loading = weui.loading('加载中');
        var alldata = {
            page: $scope.allpage,
            flag: -1
        };
        $http.post('/order/orderlist.json',alldata, postCfg)
        .then(function (resp) {
            loading.hide();
            // console.log(resp);
            if (1 === resp.data.code) {
                if(resp.data.data.orderlist.length <= 0){
                    if($scope.allpage <=1){
                        $scope.noAllContainer=true;
                        return;
                    }else{
                        weui.toast('暂无更多!', {
                            duration: 1500,
                            className: "bears"
                        });
                    }
                }else{
                    for(i=0;i<resp.data.data.orderlist.length;i++){
                        resp.data.data.orderlist[i].imgurl = picBasePath + resp.data.data.orderlist[i].imgurl;
                        resp.data.data.orderlist[i].page = $scope.allpage;
                        resp.data.data.orderlist[i].flag = -1;
                        $scope.allOrderList.push(resp.data.data.orderlist[i]);
                    }
                    $scope.allpage += 1;
                }
            }
            loading.hide();
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    }
    $scope.getAllOrder=getAllOrder;
    getAllOrder();
    // ---------------------全部订单end--------------------------

    // ---------------------待支付订单start------------------------------
    $scope.dzfpage = 1; //待支付
    $scope.noDzfContainer=false;
    $scope.dzfOrderList=[];
    function getDzfOrder(){
        var loading = weui.loading('加载中');
        var dzfdata = {
            page: $scope.dzfpage,
            flag: 0
        };
        $http.post('/order/orderlist.json',dzfdata, postCfg)
        .then(function (resp) {
            loading.hide();
            if (1 === resp.data.code) {
                if(resp.data.data.orderlist.length <= 0){
                    if($scope.dzfpage <=1){
                        $scope.noDzfContainer=true;
                        return;
                    }else{
                        weui.toast('暂无更多!', {
                            duration: 1500,
                            className: "bears"
                        });
                    }
                }else{
                    for(i=0;i<resp.data.data.orderlist.length;i++){
                        resp.data.data.orderlist[i].imgurl = picBasePath + resp.data.data.orderlist[i].imgurl;
                        resp.data.data.orderlist[i].page = $scope.dzfpage;
                        resp.data.data.orderlist[i].flag = 0;
                        $scope.dzfOrderList.push(resp.data.data.orderlist[i]);
                    }
                    $scope.dzfpage += 1;
                }
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    }
    $scope.getDzfOrder=getDzfOrder;
    getDzfOrder();
    // ---------------------待支付订单end--------------------------
    

    // ---------------------待发货订单start------------------------------
    $scope.dfhpage = 1; //待发货
    $scope.noDfhContainer=false;
    $scope.dfhOrderList=[];
    function getDfhOrder(){
        var loading = weui.loading('加载中');
        // console.log('待发货');
        var dfhdata = {
            page: $scope.dfhpage,
            flag: 1
        };
        $http.post('/order/orderlist.json',dfhdata, postCfg)
        .then(function (resp) {
            loading.hide();
            if (1 === resp.data.code) {
                if(resp.data.data.orderlist.length <= 0){
                    if($scope.dfhpage <=1){
                        $scope.noDfhContainer=true;
                        return;
                    }else{
                        weui.toast('暂无更多!', {
                            duration: 1500,
                            className: "bears"
                        });
                    }
                }else{
                    for(i=0;i<resp.data.data.orderlist.length;i++){
                        resp.data.data.orderlist[i].imgurl = picBasePath + resp.data.data.orderlist[i].imgurl;
                        resp.data.data.orderlist[i].page = $scope.dfhpage;
                        resp.data.data.orderlist[i].flag = 1;
                        $scope.dfhOrderList.push(resp.data.data.orderlist[i]);
                    }
                    $scope.dfhpage += 1;
                }
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    }
    $scope.getDfhOrder=getDfhOrder;
    getDfhOrder();
    // ---------------------待发货订单end--------------------------
    

    // ---------------------待收货订单start------------------------------
    $scope.dshpage = 1; //待收货
    $scope.noDshContainer=false;
    $scope.dshOrderList=[];
    function getDshOrder(){
        var loading = weui.loading('加载中');
        // console.log('待收货');
        var dshdata = {
            page: $scope.dshpage,
            flag: 2
        };
        $http.post('/order/orderlist.json',dshdata, postCfg)
        .then(function (resp) {
            loading.hide();
            if (1 === resp.data.code) {
                if(resp.data.data.orderlist.length <= 0){
                    if($scope.dshpage <=1){
                        $scope.noDshContainer=true;
                        return;
                    }else{
                        weui.toast('暂无更多!', {
                            duration: 1500,
                            className: "bears"
                        });
                    }
                }else{
                    for(i=0;i<resp.data.data.orderlist.length;i++){
                        resp.data.data.orderlist[i].imgurl = picBasePath + resp.data.data.orderlist[i].imgurl;
                        resp.data.data.orderlist[i].page = $scope.dshpage;
                        resp.data.data.orderlist[i].flag = 2;
                        $scope.dshOrderList.push(resp.data.data.orderlist[i]);
                    }
                    $scope.dshpage += 1;
                }
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    }
    $scope.getDshOrder=getDshOrder;
    getDshOrder();
    // ---------------------待收货订单end--------------------------


    // ---------------------售后订单start（待退款+已退款）------------------------------
    $scope.qualityList=[];//售后列表（目前为：待退款+已退款） 
    $scope.dtkpage = 1; //待退款
    $scope.dtkOrderList=[];
    $scope.noQualityContainer=false;
    function getDtkOrder(){
        var loading = weui.loading('加载中');
        // console.log('待退款');
        var dtkdata = {
            page: $scope.dtkpage,
            flag: 3
        };
        $http.post('/order/orderlist.json',dtkdata, postCfg)
        .then(function (resp) {
            loading.hide();
            if (1 === resp.data.code) {
                for(i=0;i<resp.data.data.orderlist.length;i++){
                    resp.data.data.orderlist[i].imgurl = picBasePath + resp.data.data.orderlist[i].imgurl;
                    resp.data.data.orderlist[i].page = $scope.dtkpage;
                    resp.data.data.orderlist[i].flag = 3;
                    $scope.dtkOrderList.push(resp.data.data.orderlist[i]);
                    $scope.qualityList.push(resp.data.data.orderlist[i]);
                }
                $scope.dtkpage += 1;
                if($scope.qualityList.length <= 0){
                    $scope.noQualityContainer=true;
                }else{
                    $scope.noQualityContainer=false;
                }
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    }
    $scope.getDtkOrder=getDtkOrder;
    getDtkOrder();

    // ---------------------------------------------------------------------------
    
    $scope.ytkpage = 1; //已退款
    $scope.ytkOrderList=[];
    function getYtkOrder(){
        var loading = weui.loading('加载中');
        // console.log('已退款');
        var ytkdata = {
            page: $scope.ytkpage,
            flag: 4
        };
        $http.post('/order/orderlist.json',ytkdata, postCfg)
        .then(function (resp) {
            loading.hide();
            if (1 === resp.data.code) {
                for(i=0;i<resp.data.data.orderlist.length;i++){
                    resp.data.data.orderlist[i].imgurl = picBasePath + resp.data.data.orderlist[i].imgurl;
                    resp.data.data.orderlist[i].page = $scope.ytkpage;
                    resp.data.data.orderlist[i].flag = 4;
                    $scope.ytkOrderList.push(resp.data.data.orderlist[i]);
                    $scope.qualityList.push(resp.data.data.orderlist[i]);
                }
                $scope.ytkpage += 1;
                if($scope.qualityList.length <= 0){
                    $scope.noQualityContainer=true;
                }else{
                    $scope.noQualityContainer=false;
                }
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    }
    $scope.getYtkOrder=getYtkOrder;
    getYtkOrder();

    $scope.getQualityListOrder = function (){
        getDtkOrder();
        getYtkOrder();
    };
    // ---------------------售后订单end--------------------------


    // 删除订单
    $scope.deleteOrder = function (e,order){
        e.stopPropagation();
        var data = {
            'orderid': order.id,
            'page':order.page,
            'flag':order.flag
        };
        weui.confirm('确认删除此订单吗？', function () {
            $http.post('/order/orderdelete.json', data, postCfg)
            .success(function (data) {
                if (1 === data.code) {
                    // 删除成功
                    weui.toast('删除成功!', {
                        duration: 1500,
                        className: "bears"
                    });
                    var stateflag=order.stateflag;
                    if(stateflag == 4){
                        for (var i = 0; i < $scope.ytkOrderList.length; i++) {
                            if ($scope.ytkOrderList[i].id == order.id) {
                                $scope.ytkOrderList.splice(i, 1);
                            }
                        }
                        for (var z = 0; z < $scope.qualityList.length; z++) {
                            if ($scope.qualityList[z].id == order.id) {
                                $scope.qualityList.splice(z, 1);
                                if($scope.qualityList.length <= 0){
                                    $scope.noQualityContainer = true;
                                }
                            }
                        }
                    }
                    for (var s = 0; s < $scope.allOrderList.length; s++) {
                        if ($scope.allOrderList[s].id == order.id) {
                            $scope.allOrderList.splice(s, 1);
                            if($scope.allOrderList.length <= 0){
                                $scope.noAllContainer=true;
                            }
                        }
                    }
                }
                else if (0 === data.code) {
                    alert(data.reason);
                    return;
                }
            })
            .error(function (data) {
                // alert('数据请求失败，请稍后再试！');
            });
        }, function () {
            // console.log('no')
        }, {
            title: '温馨提示'
        });
    };
    // 取消订单
    $scope.cancelOrder = function (e,order){
        e.stopPropagation();
        var data = {
            'orderid': order.id,
            'page':order.page,
            'flag':order.flag
        };
        weui.confirm('确认取消此订单吗？', function () {
            $http.post('/order/ordercancel.json', data, postCfg)
            .success(function (data) {
                if (1 === data.code) {
                    // 取消成功
                    weui.toast('取消成功!', {
                        duration: 1500,
                        className: "bears"
                    });
                    for (var i = 0; i < $scope.dzfOrderList.length; i++) {
                        if ($scope.dzfOrderList[i].id == order.id) {
                            $scope.dzfOrderList.splice(i, 1);
                            if($scope.dzfOrderList.length <= 0){
                                $scope.noDzfContainer = true;
                            }
                        }
                    }
                }
                else if (0 === data.code) {
                    alert(data.reason);
                    return;
                }
            })
            .error(function (data) {
                // alert('数据请求失败，请稍后再试！');
            });
        }, function () {
            // console.log('no')
        }, {
            title: '温馨提示'
        });
    };

    // 确认收货
    $scope.receipt = function (e,order){
        e.stopPropagation();
        var data = {
            'orderid': order.id,
            'page':order.page,
            'flag':order.flag
        };
        weui.confirm('确认收货前请仔细检查商品是否存在问题,是否继续？', function () {
            $http.post('/order/confirmreceipt.json', data, postCfg)
            .success(function (data) {
                if (1 === data.code) {
                    // 取消成功
                    weui.toast('收货成功!', {
                        duration: 1500,
                        className: "bears"
                    });
                    for (var i = 0; i < $scope.dshOrderList.length; i++) {
                        if ($scope.dshOrderList[i].id == order.id) {
                            $scope.dshOrderList.splice(i, 1);
                            if($scope.dshOrderList.length <= 0){
                                $scope.noDsfContainer = true;
                            }
                        }
                    }
                }
                else if (0 === data.code) {
                    alert(data.reason);
                    return;
                }
            })
            .error(function (data) {
                // alert('数据请求失败，请稍后再试！');
            });
        }, function () {
            // console.log('no')
        }, {
            title: '温馨提示'
        });
    };
    // 跳转订单详情
    $scope.goOrderDetail = function (order){
        $rootScope.orderDetail = order;
        $location.path('orderDetail');
    };
    // 申请退货
    $scope.returnGoods = function(e,order){
        e.stopPropagation();
        $rootScope.returnGoods = order;
        $location.path('returnGoods');
    };
}]);