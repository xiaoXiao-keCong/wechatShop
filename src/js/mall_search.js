index.controller('mallSearchCtrl',
	['$scope', '$http', '$location', '$window',
	function ($scope, $http, $location, $window) {
	
    $scope.goodsList=[];
    $scope.nothing=false;
	//实时监测执行联想搜索
	var kwds=$scope.keyword;
	setInterval(function(){
		var newkwds=$scope.keyword;
		if(kwds == newkwds || newkwds === ''){
			return;
		}
		if (!$scope.keyword || $.trim($scope.keyword) === '') {
			alert('请输入搜索关键字！');
			return;
		}
		$scope.goodsList = [];
		var data = {
			wd: $scope.keyword,
			page:1
		};
		$http.post('/home/search.json', data, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				var goodsList = data.data.goodslist;
		        if (0 === goodsList.length) {
		        	$scope.nothing = true;
		        	return;
		        }
		        else {
		        	$scope.nothing = false;
					for (i = 0; i < goodsList.length; i++) {
						goodsList[i].imgurl = picBasePath + goodsList[i].imgurl;
					}
					$scope.goodsList = goodsList;
		        }
		        
			}
		})
		.error(function (data) {
			// alert('数据请求失败，请稍后再试！');
		});
		kwds=newkwds;
		return kwds;
	},500);

    // 点赞商品
    $scope.praise = function (goods, e) {
        e.stopPropagation();
        var url = goods.keep ? '/user/unkeepgoods.json' : '/user/keepgoods.json';
        $http.post(url, {goodsid: goods.id}, postCfg)
        .success(function (data) {
            // console.log(data);
            if (-1 === data.code) {
                $location.path('fast_login').search({});
            }
            else if (1 === data.code) {
                if (!goods.keep) {
                    goods.keep = true;
                }
                else {
                    goods.keep = false;
                }
            }
        })
        .error(function (data) {
            // alert('数据请求失败，请稍后再试！');
        });
    };

	// 跳转到商品详情
	$scope.toGoodsDetail = function (goods) {
		$location.path('mall_goods_detail/' + goods.id);
	};
}]);