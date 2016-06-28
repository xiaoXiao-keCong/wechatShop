/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('homeSearchCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
	// 首页搜索
	$scope.search = function () {
		if (!$scope.keyword || $.trim($scope.keyword) === '') {
			alert('请输入搜索关键字！');
			return;
		}
		$scope.designerList = [];
		$scope.storeList = [];
		$scope.goodsList = [];
		var data = {
			q: $scope.keyword
		};
		$http.post('/home/searchall.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (1 === data.code) {
				var designerList = data.data.designerlist,
				    goodsList = data.data.goodslist,
				    storeList = data.data.storelist,
				    starUrl1 = '../../assets/images/star_h.png',
		            starUrl2 = '../../assets/images/star.png',
		            i, j, k;
		        if (0 === designerList.length && 0 === goodsList.length && 0 === storeList.length) {
		        	$scope.hasNoResult = true;
		        	return;
		        }
		        else {
		        	$scope.hasNoResult = false;
		        	// 处理发型师数据
					for (i = 0; i < designerList.length; i++) {
						designerList[i].starUrl = [];
						designerList[i].avatar = picBasePath + designerList[i].avatar;
						for (j = 0; j < designerList[i].score; j++) {
		                    designerList[i].starUrl.push({'path': starUrl1});
		                }
		                for (k = j; k < 5; k++) {
		                    designerList[i].starUrl.push({'path': starUrl2});
		                }
					}
					// 处理门店数据
					for (i = 0; i < storeList.length; i++) {
						storeList[i].img = picBasePath + storeList[i].imgurl[0];
						storeList[i].starUrl = [];
						for (j = 0; j < storeList[i].star; j++) {
		                    storeList[i].starUrl.push({'path': starUrl1});
		                }
		                for (k = j; k < 5; k++) {
		                    storeList[i].starUrl.push({'path': starUrl2});
		                }
					}
					for (i = 0; i < goodsList.length; i++) {
						goodsList[i].img = picBasePath + goodsList[i].imgarray[0].imgurl;
					}
					$scope.designerList = designerList;
					$scope.storeList = storeList;
					$scope.goodsList = goodsList;
		        }
		        
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};

	// 跳转到设计师详情
	$scope.toDesignerDetail = function (designer) {
		$location.path('stylist_detail/' + designer.id);
	};

	// 跳转到门店详情
	$scope.toStoreDetail = function (store) {
		$location.path('store_detail/' + store.id);
	};

	// 跳转到商品详情
	$scope.toGoodsDetail = function (goods) {
		$location.path('mall_goods_detail/' + goods.id);
	};
}]);