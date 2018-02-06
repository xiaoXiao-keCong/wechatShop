index.controller('mallCtrl',
    ['$scope', '$http', '$location', '$q', '$window','$interval',
    function ($scope, $http, $location, $q, $window,$interval) {
	
	
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
    $scope.dd = '00';  
    $scope.hh = '00';  
    $scope.mm = '00';  
    $scope.ss = '00';


    $scope.$on('ngRepeatFinished', function () {
        $scope.deferred.resolve('succeed');
    });
    $scope.$on('flashSaleRepeatFinished', function () {
        $scope.flashSaleDeferred.resolve('succeed');
    });

    (function init() {
        var loading = weui.loading('加载中');
        // 获取商城广告
        $http.post('/home/homead.json', postCfg)
        .then(function (resp) {
            console.log(resp);
            if (1 === resp.data.code) {
                var adList = resp.data.data.homeadlist;
                for (var i = 0, j = adList.length; i < j; i++) {
                    adList[i].imgurl = picBasePath + adList[i].imgurl;
                }
                $scope.adList = adList;
                loading.hide();
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
        // 团购特惠
        $http.post('/home/groupbuygoods.json', postCfg)
        .then(function (resp) {
            // console.log(resp);
            if (1 === resp.data.code) {
                var flashSaleList = resp.data.data.goodslist;
                for (var i = 0, j = flashSaleList.length; i < j; i++) {
                    flashSaleList[i].imgurl = picBasePath + flashSaleList[i].imgurl;
                }
                $scope.flashSaleList = flashSaleList;
                $scope.timedown = resp.data.data.timedown;
                loading.hide();
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
        // 专题精选
        $http.post('/home/specialtheme.json', postCfg)
        .then(function (resp) {
            // console.log(resp);
            if (1 === resp.data.code) {
                var brandList = resp.data.data.specialthemelist;
                for (var i = 0, j = brandList.length; i < j; i++) {
                    brandList[i].imgurl = picBasePath + brandList[i].imgurl;
                }
                $scope.brandList = brandList;
                loading.hide();
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
        getGoods();

        
    })();


    // 广告图片跳转事件
    $scope.jump = function (ad) {
        $window.location.href = ad.jumpurl;
    };

    // 跳转主题详情
    $scope.toThemeDetail = function (theme) {
        $location.path('themeDetail/' + theme.theme.id);
    };

    // 跳转主题详情
    $scope.totgDetail = function () {
        $location.path('themeDetail/1');
    };

    
    // 跳转到商品搜索页面
    $scope.searchGoods = function () {
        $location.path('mall_search');
    };

    $scope.toGoodsDetail = function (goods) {
        $location.path('mall_goods_detail/' + goods.id);
        
    };

    // 获取主题列表
    function getGoods() {
        if ($scope.loading) {
            return;
        }
        $scope.loading = true;
        var loading = weui.loading('加载中');
        var data = {
            page: $scope.page
        };
        $http.post('/home/scenetheme.json',data, postCfg)
        .then(function (resp) {
            // console.log(resp);
            if (1 === resp.data.code) {
                var goodsList = resp.data.data.scenethemelist;
                if (goodsList.length > 0) {
                    for (var i = 0, j = goodsList.length; i < j; i++) {
                        goodsList[i].imgurl = picBasePath + goodsList[i].imgurl;
                        $scope.goodsList.push(goodsList[i]);
                    }
                    $scope.page += 1;
                    $scope.loading = false;
                }
                else {
                    $scope.loaded = true;
                }
            }
            loading.hide();
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    }

    
    
    $scope.getGoods = getGoods;

    // 进入专题精选
    $scope.brandDetail = function (brand) {
        $location.path('themeDetail/' + brand.id);
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
                // $window.location.href = '/webapp/src/xiaoyue/home.html';
                break;
        }
    };

     
    var timer = $interval(countTime,1000);
    function countTime () {  
        //获取当前时间  
        var date = new Date();  
        var now = date.getTime();  
        //设置截止时间  
        var endDate = new Date($scope.timedown); 
        var end = endDate.getTime();  
        //时间差  
        var leftTime = end-now;  
        //定义变量 d,h,m,s保存倒计时的时间
        if (leftTime>=0) {  
            $scope.dd = checkTime(Math.floor(leftTime/1000/60/60/24));  
            $scope.hh = checkTime(Math.floor(leftTime/1000/60/60%24));  
            $scope.mm = checkTime(Math.floor(leftTime/1000/60%60));  
            $scope.ss = checkTime(Math.floor(leftTime/1000%60));                    
        }else{
            $scope.dd = '00';
            $scope.hh = '00';
            $scope.mm = '00';
            $scope.ss = '00';
            $interval.cancel(timer);
        }
        //将倒计时赋值到div中   
        //递归每秒调用countTime方法，显示动态时间效果  

    }
    function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
      if(i<10) 
      { 
        i = "0" + i; 
      } 
      return i; 
    } 
    $scope.$on('$destroy',function(){  
       $interval.cancel(timer);  
    });
    
}]);