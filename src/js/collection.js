/**
 * Created by hugotan on 2016/4/11.
 */
index.controller('collectionCtrl',
    ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {

    $scope.isDesigner = true; 
    var designerPromise = $http.post('/user/mykeepdesigner.json', postCfg);
    designerPromise.then(function (resp) {
        console.log(resp);
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

    // 获取收藏的时尚发型
    function getFashionHair() {
        $http.post('/user/mykeepfashionhair.json', postCfg)
        .then(function (resp) {
            console.log(resp);
        }, function (resp) {
            console.log(resp);
        });
    }

    // 跳转到设计师详情
    $scope.toDesignerDetail = function (designer) {
        $location.path('stylist_detail/' + designer.id);
    };
}]);