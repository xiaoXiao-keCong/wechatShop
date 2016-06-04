/**
 * Created by hugotan on 2016/4/11.
 */
index.controller('collectionCtrl',
    ['$scope', '$http', '$rootScope', '$location',
    function ($scope, $http, $rootScope, $location) {

    

    // 优秀造型师
    $scope.getDesigner = function () {
        $scope.isDesigner = true;
        $scope.isHair = false;
        $scope.isStore = false;
        $scope.isGoods = false;
        $http.post('/user/mykeepdesigner.json', postCfg)
        .then(function (resp) {
            if (-1 === resp.data.code) {
                $location.path('login');
            }
            else if (1 === resp.data.code) {
                var designerList = resp.data.data.designerlist;
                // 对图片地址添加前缀
                for (var i = 0, j = designerList.length; i < j; i++) {
                    designerList[i].imgurl = picBasePath + designerList[i].imgurl;
                }
                $scope.designerList = designerList;
            }
        }, function (resp) {
            console.log(resp);
        });
    };
    // 初始化执行获取优秀造型师
    $scope.getDesigner();

    // 时尚发型
    $scope.getFashionHair = function () {
        $scope.isDesigner = false;
        $scope.isHair = true;
        $scope.isStore = false;
        $scope.isGoods = false;
        $http.post('/user/mykeepfashionhair.json', postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                var hairList = resp.data.data.fashionhairlist;
                for (var i = 0, j = hairList.length; i < j; i++) {
                    hairList[i].imgurl = picBasePath + hairList[i].imgurl;
                }
                $scope.hairList = hairList;
            }
        }, function (resp) {
            console.log(resp);
        });
    };

    // 明星门店
    $scope.getStarStore  = function () {
        $scope.isDesigner = false;
        $scope.isHair = false;
        $scope.isStore = true;
        $scope.isGoods = false;
        $http.post('/user/mykeepstore.json')
        .success(function (data) {
            console.log(data);
        })
        .error(function (data) {
            console.log(data);
            alert('数据请求失败，请稍后再试！');
        });
    };

    // 悦商品
    $scope.getGoods = function () {
        $scope.isDesigner = false;
        $scope.isHair = false;
        $scope.isStore = false;
        $scope.isGoods = true;
        $http.post('/user/mykeepgoods.json')
        .success(function (data) {
            console.log(data);
        })
        .error(function (data) {
            console.log(data);
            alert('数据请求失败，请稍后再试！');
        });
    };

    // 跳转到设计师详情
    $scope.toDesignerDetail = function (designer) {
        $location.path('stylist_detail/' + designer.id);
    };

    // 跳转到时尚发型详情
    $scope.showHairInfo = function (hair) {
        $location.path('fashion_hair_info/' + hair.id);
    };
}]);