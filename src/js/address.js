index.controller('addressCtrl',
    ['$scope', '$http', '$location', '$rootScope', '$window',
    function ($scope, $http, $location, $rootScope, $window) {
    $scope.nothing=false;
    $scope.addrList=[];
    function init() {
        // 获取用户收货地址
        $http.post('/user/myaddress.json', postCfg)
            .success(function (data) {
                // console.log(data);
                if (-1 === data.code) {
                    $rootScope.preUrl = $location.url();
                    $location.path('fast_login');
                }
                else if (1 === data.code && 0 < data.data.addresslist.length) {
                    var addressList = data.data.addresslist,
                        params = $location.search();
                    if (params.current_id) {
                        for (var i = 0, j = addressList.length; i < j; i++) {
                            if (addressList[i].id == params.current_id) {
                                addressList[i].selectedSite = true;
                            }
                        }
                    }
                    $scope.addrList = addressList;
                    // 添加左滑删除效果
                    setTimeout(function(){
                        var expansion = null; //是否存在展开的list
                        var x, y, X, Y, swipeX, swipeY;
                        $('.addr-item').on('touchstart', function(event) {
                            var _touch = event.originalEvent.targetTouches[0];
                            x= _touch.pageX;
                            y= _touch.pageY;
                            swipeX = true;
                            swipeY = true;
                                    
                        });
                        $('.addr-item').on('touchend', function(event){
                            var _touch = event.originalEvent.changedTouches[0];
                            X= _touch.pageX;
                            Y= _touch.pageY;        
                            // 左右滑动
                            if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
                                // 阻止事件冒泡
                                event.stopPropagation();
                                if(X - x > 10){   //右滑
                                    event.preventDefault();
                                    $(this).removeClass("swipeleft");    //右滑收起
                                }
                                if(x - X > 10){   //左滑
                                    event.preventDefault();
                                    if(expansion){   //判断是否展开，如果展开则收起
                                        expansion.removeClass("swipeleft");
                                    }
                                    $(this).addClass("swipeleft");   //左滑展开
                                    expansion = $(this);
                                }
                                swipeY = false;
                            }
                            // 上下滑动
                            if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
                                swipeX = false;
                            }        
                        });
                    });
                    
                }
                if($scope.addrList.length === 0){
                    $scope.nothing=true;
                }
            })
            .error(function (resp) {
                // console.log(resp);
            }
        );
    }

    init();
    
    
    // 选择地址后返回确认订单页面
    $scope.backToOrder = function (addr) {
        // 将选择的地址放到sessionStorage中
        sessionStorage.setItem('site', JSON.stringify(addr));
        $window.history.back();
    };

    // 编辑地址
    $scope.toEditAddr = function (e, addr) {
        e.stopPropagation();
        // 传id的值到编辑页面
        $location.path('add_receiver').search({addr_id: addr.id});
    };

    // 跳转到添加地址页面
    $scope.addAddress = function () {
        $location.path('add_receiver');
    };
    // 删除地址
    $scope.deletAdd = function(id){
        event.stopPropagation();
        var deletdata={
            id:id
        };
        $http.post('/user/deleteaddress.json', deletdata, postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                $(this).parent().remove();
                for(var m=0;m<$scope.addrList.length;m++){
                    if($scope.addrList[m].id == id){
                        $scope.addrList.splice(m,1);
                    }
                }
                if($scope.addrList.length === 0){
                    $scope.nothing=true;
                }
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    };
}]);