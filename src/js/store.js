/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('storeCtrl',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
	
    $scope.isList = true;
    $scope.switch = function () {
    	$scope.isList = !$scope.isList;
    };
    $scope.toDetail = function (store) {
        $location.path('store_detail/' + store.id);
    };

    // 获取所有门店
    $http.post('/store/all.json', postCfg)
    .success(function (data) {
        if (1 === data.code) {
            var areaList = data.data.arealist,
                storeList = [],
                starUrl1 = '../../assets/images/star_h.png',
                starUrl2 = '../../assets/images/star.png',
                area, i, j, k, l, n, store;
            for (i = 0, j = areaList.length; i < j; i++) {
                area = areaList[i];
                for (k = 0; k < area.storelist.length; k++) {
                    store = area.storelist[k];
                    store.img1 = picBasePath + store.imgurl[0];    // 正方形
                    store.img2 = picBasePath + store.imgurl[1];
                    store.starUrl = [];
                    for (l = 0; l < store.star; l++) {
                        store.starUrl.push({'path': starUrl1});
                    }
                    for (n = l; n < 5; n++) {
                        store.starUrl.push({'path': starUrl2});
                    }
                    storeList.push(store);
                }
            }
            $scope.storeList = storeList;
            console.log($scope.storeList);
        }
    })
    .error(function (data) {
        console.log(data);
        alert('数据请求失败，请稍后再试！');
    });
}]);