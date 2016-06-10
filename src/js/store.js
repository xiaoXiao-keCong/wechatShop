/**
 * Created by hugotan on 2016/4/16.
 */
index.controller('storeCtrl',
    ['$scope', '$http', '$location', function ($scope, $http, $location) {
	
    var isGetStoreInfo = false;
    $scope.areaFilter = '全部区域';
    $scope.filterText = '综合排序';
    $scope.filterDefault = true;

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
        }
    })
    .error(function (data) {
        console.log(data);
        alert('数据请求失败，请稍后再试！');
    });

    // 跳转到门店搜索页面
    $scope.storeSearch = function () {
        $location.path('store_search');
    };

    // 将请求回来的数据转化为可用数据
    function handleData(storeList) {
        var starUrl1 = '../../assets/images/star_h.png',
            starUrl2 = '../../assets/images/star.png',
            k, l, n;
        for (k = 0; k < storeList.length; k++) {
            storeList[k].img1 = picBasePath + storeList[k].imgurl[0];    // 正方形
            storeList[k].img2 = picBasePath + storeList[k].imgurl[1];
            storeList[k].starUrl = [];
            for (l = 0; l < storeList[k].star; l++) {
                storeList[k].starUrl.push({'path': starUrl1});
            }
            for (n = l; n < 5; n++) {
                storeList[k].starUrl.push({'path': starUrl2});
            }
        }
        $scope.storeList = storeList;
        console.log($scope.storeList);
    }

    // 获取门店筛选条件
    $scope.getStoreInfo = function () {
        $scope.showStore = !$scope.showStore;
        $scope.showMask = $scope.showStore ? true : false;
        $scope.filterShow = false;
        $scope.isShowSort = false;
        if (!isGetStoreInfo) {
            $http.post('/store/all.json', postCfg)
            .success(function (data) {
                console.log(data);
                if (1 === data.code) {
                    var areaList = data.data.arealist;
                    $scope.areaList = areaList;
                    isGetStoreInfo = true;
                }
            })
            .error(function (data) {
                console.log(data);
            });
        }
        
    };

    // 选择区域
    $scope.selectCity = function (area, e) {
        e.stopPropagation();
        $scope.showMask = false;
        $scope.showStore = false;
        $scope.areaId = area.id;
        var index = $scope.areaList.indexOf(area);
        if (index !== -1 && $scope.areaList[index].selected !== true) {
            console.log(area);
            for (var i = 0; i < $scope.areaList.length; i++) {
                $scope.areaList[i].selected = false;
            }
            area.selected = true;
            // 根据areaid请求门店列表
            var data = {
                page: 1,
                areaid: area.id,
                sort: $scope.sort || 'default'
            };
            $http.post('/store/list.json', data, postCfg)
            .success(function (data) {
                if (1 === data.code) {
                    handleData(data.data.storelist);
                    $scope.areaFilter = area.name;
                }
            })
            .error(function (data) {
                console.log(data);
                alert('数据请求失败，请稍后再试！');
            });
        }
    };

    $scope.showFilterItems = function () {
        $scope.filterShow = !$scope.filterShow;
        $scope.showMask = $scope.filterShow ? true : false;
        $scope.showStore = false;
        $scope.isShowSort = false;
    };


    // 自助筛选
    $scope.filter = function (type, index, e) {
        e.stopPropagation();
        var filterText = ['综合排序', '订单最多', '离我最近', '价格最低', '价格最高', ''];
        $scope.filterShow = false;
        $scope.showMask = false;
        $scope.filterDefault = (type === 'default') ? true : false;
        $scope.filterMostReserve = (type === 'hottest') ? true : false;
        $scope.filterHighestScore = (type === 'highestscore') ? true : false;
        $scope.filterNearest = (type === 'nearest') ? true : false;
        $scope.filterCheapest = (type === 'cheapest') ? true : false;
        $scope.filterExpensive = (type === 'expensive') ? true : false;
        if ($scope.sort !== type) {
            var data = {
                page: 1,
                areaid: $scope.areaId,
                sort: type || 'default'
            };
            $http.post('/store/list.json', data, postCfg)
            .success(function (data) {
                console.log(data);
                if (1 === data.code) {
                    handleData(data.data.storelist);
                    
                }
            })
            .error(function (data) {
                console.log(data);
                alert('数据请求失败，请稍后再试！');
            });
            $scope.sort = type;
            $scope.filterText = filterText[index];
        }
    };
}]);