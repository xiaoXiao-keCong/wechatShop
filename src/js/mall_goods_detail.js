/**
 * Created by hugotan on 2016/5/1.
 */
index.controller('mallGoodsDetailCtrl',
	['$scope', '$http', '$routeParams', '$window', '$location', '$rootScope', '$q',
	function ($scope, $http, $routeParams, $window, $location, $rootScope, $q) {

	// 购买数量默认为1
	$scope.buyNum = 1;
	$scope.deferred = $q.defer();
	$scope.hotSaleDeferred = $q.defer();
	$scope.hotSaleGoods = [];

	$scope.hotSalePage = 1;

	var goodsId = parseInt($routeParams.id);
	// 获取商品详情
	$http.post('/shop/getgoodsbyid.json', {id: goodsId}, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var goods = resp.data.data;
			for (var i = 0, j = goods.imgarray.length; i < j; i++) {
				goods.imgarray[i].imgurl = picBasePath + goods.imgarray[i].imgurl;
			}
			goods.imgurl = goods.imgarray[0].imgurl;
			$scope.goods = goods;
		}
	}, function (resp) {
		console.log(resp);
	});

	// 获取商品评论信息
	$http.post('/shop/goodscomment.json', {id: goodsId}, postCfg)
	.success(function (data) {
		if (1 === data.code) {
			var commentInfo = data.data,
			    starUrl1 = '../../assets/images/star_h_2.png',
                starUrl2 = '../../assets/images/star_2.png';
			commentInfo.imgArr = [];
			commentInfo.starUrl = [];
			if (commentInfo.totalCommentnum > 0) {
				for (var i = 0; i < commentInfo.comment.imgurllist.length; i++) {
					commentInfo.imgArr.push({path: picBasePath + commentInfo.comment.imgurllist[i]});
				}
				for (i = 0; i < commentInfo.comment.star; i++) {
		            commentInfo.starUrl.push({'path': starUrl1});
		        }
		        for (var j = i; j < 5; j++) {
		            commentInfo.starUrl.push({'path': starUrl2});
		        }
				commentInfo.userImg = picBasePath + commentInfo.comment.user.imgurl;
				commentInfo.userVipImg = picBasePath + commentInfo.comment.user.vipimgurl;
			}
			$scope.commentInfo = commentInfo;
			console.log($scope.commentInfo);
		}
	})
	.error(function (data) {
		console.log(data);
	});

	$scope.toGuarantee = function () {
		$window.location.href = $scope.goods.yueurl;
	};

	// 加进购物车
	$scope.addToCart = function () {
		if (!sessionStorage.user) {
			// 未登录，跳转到登录页面，将当前页面url存储到rootScope中
			$location.path('login');
		}
		else {
			// 用户已经登录，添加商品到购物车
			var data = {
				'goodsid': parseInt(goodsId),
				'number': 1
			};
			$http.post('/user/addtocart.json', data, postCfg)
			.then(function (resp) {
				if (1 === resp.data.code) {
					// 添加进购物车成功
					alert('商品添加购物车成功！');
				}
				else if (-1 === resp.data.code) {
					// 用户未登录
					$rootScope.preUrl = $location.url();
					$location.path('login');
				}
			}, function (resp) {
				console.log(resp);
			});

		}
	};

	// 立即购买
	$scope.buy = function () {
		// 判断用户是否登录
		if (!sessionStorage.user) {
			// 用户未登录，跳转到登录页面
			$rootScope.preUrl = $location.url();
			$location.path('login');
		}
		else {
			var user = JSON.parse(sessionStorage.user);
			if (1 === user.vip.id) {
				// 普通会员
				$scope.goods.price = $scope.goods.realprice;
			}
			else {
				// vip会员
				$scope.goods.price = $scope.goods.vipprice;
			}
			$scope.isBuy = true;
		}
	};

	// 取消购买
	$scope.cancelBuy = function () {
		$scope.isBuy = false;
	};


	$scope.$on('ngRepeatFinished', function () {
		$scope.deferred.resolve('succeed');
	});

	$scope.$on('hotSaleRepeatFinished', function () {
		$scope.hotSaleDeferred.resolve('succeed');
	});
	// 确认购买
	$scope.confirmBuy = function () {
		$rootScope.goodsArr = [];
		$rootScope.numArr = [];
		$scope.goods.buyNum = $scope.buyNum;
		$rootScope.goodsArr.push($scope.goods);
		$rootScope.numArr.push($scope.buyNum);
		$rootScope.cartFlag = 0;
		$location.path('order_confirm');
	};

	// 改变购买数量
	$scope.changeBuyNum = function (type) {
		switch (type) {
			case 1:
				// 减少数量
				if (1 !== $scope.buyNum) {
					$scope.buyNum--;
				}
				break;
			case 2:
				// 增加数量
				if ($scope.buyNum != $scope.goods.inventory) {
					$scope.buyNum++;
				}
				break;
		}
	};

	// 点赞商品，index为1执行点赞，index为2执行取消点赞
	$scope.praiseOperation = function (index) {
		var postUrl = index === 1 ? '/user/keepgoods.json' : '/user/unkeepgoods.json';
		$http.post(postUrl, {goodsid: goodsId}, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				$scope.goods.iskeep = index === 1 ? true : false;
			}
		})
		.error(function (data) {
			console.log(data);
		});
	};

	// 跳转到购物车界面
	$scope.toCart = function () {
		$location.path('cart');
	};

	// 获取热销推荐
	function getHotSaleRecommend() {
		$http.post('/shop/recommendhotgoods.json', {page: $scope.hotSalePage}, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				var goodsList = data.data.goodslist;
                if (goodsList.length > 0) {
                    for (var i = 0, j = goodsList.length; i < j; i++) {
                        goodsList[i].imgurl = picBasePath + goodsList[i].imgurl1;
                        $scope.hotSaleGoods.push(goodsList[i]);
                    }
                }
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	}

	$scope.getHotSaleRecommend = getHotSaleRecommend;
	getHotSaleRecommend();

	$scope.toGoodsDetail = function (goods) {
		$location.path('mall_goods_detail/' + goods.id);
	};

	$scope.toGoodsComment = function () {
		$location.path('goods_comment/' + $scope.goods.id);
	};

}]);