index.controller('mallGoodsDetailCtrl',
	['$scope', '$http', '$routeParams', '$window', '$location', '$rootScope', '$q',
	function ($scope, $http, $routeParams, $window, $location, $rootScope, $q) {

	// 购买数量默认为1
	$scope.buyNum = 1;
	$scope.selectedColorId = '';
	$scope.selectedSizeId = '';
	$scope.promptImgurl = '';
	$scope.collocationList=[];
	$scope.inventory = 1;
	var goodsId = parseInt($routeParams.id);
	$scope.deferred = $q.defer();
	$scope.flashSaleDeferred = $q.defer();
	$scope.shareInfor=[];

	$scope.$on('ngRepeatFinished', function () {
        $scope.deferred.resolve('succeed');
    });
    $scope.$on('flashSaleRepeatFinished', function () {
        $scope.flashSaleDeferred.resolve('succeed');
    });
	(function init() {
		var loading = weui.loading('加载中');
		// 获取商品详情
		$http.post('/goods/getsimpleinfo.json', {goodsid: goodsId}, postCfg)
		.then(function (resp) {
			console.log(resp);
			if (1 === resp.data.code) {
				var goods = resp.data.data;
				for (var i = 0, j = goods.imgarray.length; i < j; i++) {
					goods.imgarray[i].imgurl = picBasePath + goods.imgarray[i].imgurl;
				}
				goods.imgurl=picBasePath + goods.imgurl; 
				goods.detailimgurl=picBasePath + goods.detailimgurl; 
				$scope.goodsImg = goods.imgarray;
				$scope.detailimgurl = goods.detailimgurl;
				$scope.goods = goods;
			}
			loading.hide();
		}, function (resp) {
			// alert('数据请求失败，请稍后再试！');
		});

		// 获取商品颜色及尺寸
		$http.post('/goods/getcolorandsize.json', {goodsid: goodsId}, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				// console.log('商品颜色及尺寸');
				// console.log(data);
				var goodscolors=data.data.color;
				for (var m = 0; m < goodscolors.length; m++) {
					goodscolors[m].imgurl = picBasePath + goodscolors[m].imgurl;
					goodscolors[m].imgselected = picBasePath + goodscolors[m].imgselected;
					goodscolors[m].imgunenabled = picBasePath + goodscolors[m].imgunenabled;
				}
				$scope.goodsColors=goodscolors;
				// 尺寸
				var sizelist=data.data.size;
				for (var n = 0; n < goodscolors.length; n++) {
					sizelist[n].imgurl = picBasePath + sizelist[n].imgurl;
					sizelist[n].imgselected = picBasePath + sizelist[n].imgselected;
					sizelist[n].imgunenabled = picBasePath + sizelist[n].imgunenabled;
				}
				$scope.sizeList=sizelist;
			}
			loading.hide();
		})
		.error(function (data) {
			// alert('数据请求失败，请稍后再试！');
		});

		// 获取搭配推荐
		$http.post('/goods/getgoodsrecommend.json', {goodsid: goodsId,type:1}, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				// console.log('搭配推荐');
				// console.log(data);
				var collocationlist=data.data.goodslist;
				for (var i = 0, j = collocationlist.length; i < j; i++) {
                    collocationlist[i].imgurl = picBasePath + collocationlist[i].imgurl;
                }
                $scope.collocationList = collocationlist;
			}
			loading.hide();
		})
		.error(function (data) {
			// alert('数据请求失败，请稍后再试！');
		});

		// 获取相似推荐
		$http.post('/goods/getgoodsrecommend.json', {goodsid: goodsId,type:2}, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				// console.log('相似推荐');
				// console.log(data);
				var similarlist=data.data.goodslist;
				for (var i = 0, j = similarlist.length; i < j; i++) {
                    similarlist[i].imgurl = picBasePath + similarlist[i].imgurl;
                }
                $scope.similarList = similarlist;
			}
			loading.hide();
		})
		.error(function (data) {
			// alert('数据请求失败，请稍后再试！');
		});
		//获取分享信息
		$http.post('/user/unl/share.json', {id: goodsId}, postCfg)
		.success(function (data) {
			if (1 === data.code) {
				console.log(data);
				$scope.shareInfor=data.data;
				var wxdata={
					'url':$window.location.href.split('#')[0]  
				};
				$http.post('/user/unl/wzinfo.json',wxdata, postCfg)
				.then(function (resp) {
					console.log(resp);
					if (1 === resp.data.code) {
						wx.config({
						    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						    appId: resp.data.data.appid, // 必填，公众号的唯一标识
						    timestamp: resp.data.data.timestamp, // 必填，生成签名的时间戳
						    nonceStr: resp.data.data.noncestr, // 必填，生成签名的随机串
						    signature: resp.data.data.signature,// 必填，签名，见附录1
						    jsApiList: [
						    	'checkJsApi',
								'onMenuShareAppMessage',
								'onMenuShareTimeline'
						    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
						wx.ready(function () {
						//分享给朋友
						wx.onMenuShareAppMessage({
							title: $scope.shareInfor.topic, // 分享标题
							desc: $scope.shareInfor.info, // 分享描述
							link: $scope.shareInfor.jumpurl, // 分享链接
							imgUrl: picBasePath+$scope.shareInfor.imgurl, // 分享图标
							type: 'link', // 分享类型,music、video或link，不填默认为link
							dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
							success: function () {
							// 用户确认分享后执行的回调函数
							//$.diyAlert("分享成功！");
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							//alert("用户取消分享！");
							}
						});
						//分享到朋友圈
						wx.onMenuShareTimeline({
							title: $scope.shareInfor.topic, // 分享标题
							desc: $scope.shareInfor.info, // 分享描述
							link: $scope.shareInfor.jumpurl, // 分享链接
							imgUrl: picBasePath+$scope.shareInfor.imgurl, // 分享图标
							success: function () {
							// 用户确认分享后执行的回调函数
							//$.diyAlert("分享到朋友圈成功！");
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							}
							});
						});
					}
				}, function (resp) {
			        // alert('数据请求失败，请稍后再试！');
				});
			}
		})
		.error(function (data) {
			// alert('数据请求失败，请稍后再试！');
		});
		
	})();
	// 选择颜色
	$scope.selectColor = function (color){
		$scope.selectedColorId = color.id;
		$scope.selectedColorName = color.name;
		// 获取库存
		if($scope.selectedSizeId === ''){
			return;
		}else{
			var ivtdata={
				goodsid:goodsId,
				colorid:$scope.selectedColorId,
				sizeid:$scope.selectedSizeId,
			};
			$http.post('/goods/getinventory.json', ivtdata, postCfg)
			.then(function (resp) {
				if (1 === resp.data.code) {
					$scope.inventory=resp.data.data.inventory;
					$(".inventory").show().fadeOut(2000);
				}
				
			}, function (resp) {
				// alert('数据请求失败，请稍后再试！');
			});
		}
	};
	// 选择尺寸
	$scope.selectSize = function (size){
		$scope.selectedSizeId = size.id;
		$scope.selectedSizeName = size.name;
		// 获取库存
		if($scope.selectedColorId === ''){
			return;
		}else{
			var ivtdata={
				goodsid:goodsId,
				colorid:$scope.selectedColorId,
				sizeid:$scope.selectedSizeId,
			};
			$http.post('/goods/getinventory.json', ivtdata, postCfg)
			.then(function (resp) {
				if (1 === resp.data.code) {
					$scope.inventory=resp.data.data.inventory;
					$(".inventory").show().fadeOut(2000);
				}
				
			}, function (resp) {
				// alert('数据请求失败，请稍后再试！');
			});
		}
	};
	// 加进购物车
	$scope.addToCart = function () {
		if (!sessionStorage.user) {
			// 未登录，跳转到登录页面，将当前页面url存储到rootScope中
			// $location.path('fast_login').search({});
			window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef3e1498e754b61d&redirect_uri=http:%2F%2Fkssapit.bjxiaoyuekeji.com%2Fwechatshop%2Fbuild%2Fhtml%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
			return;
		}
		var user = JSON.parse(sessionStorage.user);
		// 用户已经登录，添加商品到购物车
		// if($scope.selectedColorId === ''){
		// 	alert('您还没有选择商品属性！');
		// 	return;
		// }else if($scope.selectedSizeId === ''){
		// 	$scope.promptImgurl = '../../assets/images/size_toast.png';
		// 	$(".goods-prompt").show().fadeOut(2000);
		// 	return;
		// }
		var data = {
			'goodsid': parseInt(goodsId),
			'number': 1,
			'colorid':$scope.selectedColorId ,
			'sizeid':$scope.selectedSizeId
		};
		$http.post('/user/addtocart.json', data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				// 添加进购物车成功
				$scope.promptImgurl = '../../assets/images/success_toast.png';
				$(".goods-prompt").show().fadeOut(2000);
			}
			else if (-1 === resp.data.code) {
				// 用户未登录
				$location.path('fast_login').search({});
			}
			
		}, function (resp) {
			// alert('数据请求失败，请稍后再试！');
		});

	};

	// 立即购买
	$scope.buy = function () {
		// 判断用户是否登录
		if (!sessionStorage.user) {
			// 用户未登录，跳转到登录页面
			// $location.path('fast_login').search({});
			window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef3e1498e754b61d&redirect_uri=http:%2F%2Fkssapit.bjxiaoyuekeji.com%2Fwechatshop%2Fbuild%2Fhtml%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
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

	

	// 确认购买
	$scope.confirmBuy = function () {
		if (!sessionStorage.user) {
			// 用户未登录，跳转到登录页面
			$location.path('fast_login').search({});
		}
		else {
			// if($scope.selectedColorId === ''){
			// 	alert('您还没有选择商品属性！');
			// 	return;
			// }else if($scope.selectedSizeId === ''){
			// 	$scope.promptImgurl = '../../assets/images/size_toast.png';
			// 	$(".goods-prompt").show().fadeOut(2000);
			// 	return;
			// }
			$rootScope.goodsArr = [];
			$rootScope.numArr = [];
			$rootScope.colorArr = [];
			$rootScope.sizeArr = [];
			$scope.goods.buyNum = $scope.buyNum;
			$scope.goods.color = $scope.selectedColorName;
			$scope.goods.size = $scope.selectedSizeName;
			$rootScope.goodsArr.push($scope.goods);
			$rootScope.numArr.push($scope.buyNum);
			$rootScope.colorArr.push($scope.selectedColorId);
			$rootScope.sizeArr.push($scope.selectedSizeId);
			$rootScope.cartFlag = 0;
			// $rootScope.selectedStore = null;
			$location.path('order_confirm').search({});
		}
		
	};


	// 点赞商品，index为1执行点赞，index为2执行取消点赞
	$scope.praiseOperation = function (index) {
		var postUrl = index === false ? '/user/keepgoods.json' : '/user/unkeepgoods.json';
		$http.post(postUrl, {goodsid: goodsId}, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('fast_login').search({});
			}
			else if (1 === data.code) {
				// $scope.goods.iskeep = index === 1 ? true : false;
				if (index === false) {
					$scope.goods.keep = true;
				}
				else {
					$scope.goods.keep = false;
				}
			}
		})
		.error(function (data) {
			// alert('数据请求失败，请稍后再试！');
		});
	};

	// 跳转到购物车界面
	$scope.toCart = function () {
		$location.path('cart').search({});
	};

	$scope.toGoodsDetail = function (goods) {
		$location.path('mall_goods_detail/' + goods.id);
	};

	

}]);