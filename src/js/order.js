/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('orderCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
		var titles = ['我的预约', '服务记录', '商城订单'];
	$scope.title = '我的预约';
	$scope.isAppointOrder = true;
	$scope.isServiceOrder = false;
	$scope.isMallOrder = false;
	$scope.orderNav = function (index) {
		$scope.isAppointOrder = (1 === index ? true : false);
		$scope.isServiceOrder = (2 === index ? true : false);
		$scope.isMallOrder = (3 === index ? true: false);
		$scope.title = titles[index - 1];
		$scope.showMask = false;
		switch (index) {
			case 1:
			    // 我的预约
			    getAppointOrder(0);
			    break;
		    case 2:
		        getServiceRecord(2);
		        break;
		    case 3:
		        getMallOrder(2);
		}
	};

	$scope.toPay = function () {
		$location.path('pay_goods');
	};
	$scope.toDetail = function () {
		$location.path('order_detail');
	};
	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				$location.path('/');
				break;
			case 2:
				$location.path('stylist');
				break;
			case 3:
				$location.path('appointment');
				break;
			case 4:
				$location.path('order');
				break;
			case 5:
				$location.path('my');
				break;
		}
	};

	(function init() {
		getAppointOrder(0);
	})();

	$scope.getAppointOrder = getAppointOrder;

	function getAppointOrder(flag) {
		if (($scope.appointFinished === true && flag === 1) ||
			    ($scope.appointFinished === false && flag === 0)) {
			return;
		}
		$scope.appointFinished = flag == 1 ? true : false;
		var data = {
			flag: flag,
			page: 1
		};
		$http.post('/user/myreserveorder.json', data, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				var reserveOrderList = data.data.reserveorderlist;
				for (var i = 0; i < reserveOrderList.length; i++) {
					reserveOrderList[i].designer.imgurl = picBasePath +
					    reserveOrderList[i].designer.imgurl;

				}
				$scope.reserveOrderList = reserveOrderList;
			}
		})
		.error(function (data) {
			console.log(data);
			alert('数据请求失败，请稍后再试！');
		});
	}

	// 取消预约订单
	$scope.cancelReserveOrder = function (reserve) {
		$http.post('/user/cancelreserveorder.json', {id: reserve.id, page: 1}, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				alert('订单取消成功!');
				$scope.reserveOrderList[$scope.reserveOrderList.indexOf(reserve)].state = '已取消';
				$scope.reserveOrderList[$scope.reserveOrderList.indexOf(reserve)].stateflag = 3;
			}
		})
		.error(function (data) {
			console.log(data);
			alert('数据请求失败，请稍后再试！');
		});
	};

	$scope.getServiceRecord = getServiceRecord;
	// 获取服务记录,flag取值为0,1,2,分别代表未完成、已完成和全部
	function getServiceRecord(flag) {
		if (($scope.allService && flag == 2) || ($scope.unfinishedService && flag === 0) ||
			($scope.finishedService && flag == 1)) {
			return;
		}
		$scope.allService = flag == 2 ? true : false;
		$scope.unfinishedService = flag === 0 ? true : false;
		$scope.finishedService = flag === 1 ? true : false;
		$http.post('/user/myconsumerorder.json', {flag: flag, page: 1}, postCfg)
		.success(function (data) {
			console.log(data);
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				var consumerOrderList = data.data.consumerorderlist;
				for (var i = 0; i < consumerOrderList.length; i++) {
					consumerOrderList[i].designer.imgurl = picBasePath +
					    consumerOrderList[i].designer.imgurl;

				}
				$scope.consumerOrderList = consumerOrderList;
			}
		})
		.error(function (data) {
			console.log(data);
			alert('数据请求失败，请稍后再试！');
		});
	}

	// 取消服务记录
	$scope.cancelConsumerOrder = function (service) {
		console.log(service);
		var data = {
			id: service.id,
			page: 1
		};
		$http.post('/user/cancelconsumerorder.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				alert('订单取消成功！');
				$scope.consumerOrderList[$scope.consumerOrderList.indexOf(service)].state = '已取消';
				$scope.consumerOrderList[$scope.consumerOrderList.indexOf(service)].stateflag = 2;
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};

	$scope.deleteConsumerOrder = function (service) {
		console.log(service);
		$http.post('/user/deleteconsumerorder.json', {orderid: service.id}, postCfg)
		.success(function (data) {
			console.log(data);
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				alert('订单删除成功！');
				$scope.consumerOrderList.splice($scope.consumerOrderList.indexOf(service), 1);
			}
		})
		.error(function (data) {
			alert('数据请求失败，请稍后再试！');
		});
	};

	$scope.getMallOrder = getMallOrder;
	// 获取全部商城订单
	function getMallOrder(flag) {
		if (($scope.allGoods && flag === 2) || ($scope.unfinishedGoods && flag === 0)||
			($scope.finishedGoods && flag === 1)) {
			return;
		}
		$scope.allGoods = flag === 2 ? true : false;
		$scope.unfinishedGoods = flag === 0 ? true : false;
		$scope.finishedGoods = flag === 1 ? true : false;
		$http.post('/user/mygoodsorder.json', {flag: flag, page: 1}, postCfg)
		.success(function (data) {
			console.log(data);
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				var goodsOrderList = data.data.goodsorderList;
				for (var i = 0; i < goodsOrderList.length; i++) {
					goodsOrderList[i].imgUrlArr = [];
					for (var j = 0; j < goodsOrderList[i].goodslist.length; j++) {
						goodsOrderList[i].imgUrlArr.push(
							{path: picBasePath + goodsOrderList[i].goodslist[j].imgurl});
					}
				}
				$scope.goodsOrderList = goodsOrderList;
			}
		})
		.error(function (data) {
			console.log(data);
		});
	}
	// 删除商城订单
	$scope.deleteGoodsOrder = function (goods) {
		console.log(goods);
		$http.post('/user/deletegoodsorder.json', {orderid: goods.id}, postCfg)
		.success(function (data) {
			console.log(data);
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				// 订单删除成功
				alert('订单删除成功！');
				$scope.goodsOrderList.splice($scope.goodsOrderList.indexOf(goods), 1);
			}
		})
		.error(function (data) {
			console.log(data);
			alert('数据请求失败，请稍后再试！');
		});
	};
	// 取消商城订单
	$scope.cancelGoodsOrder = function (goods) {
		console.log(goods);
		var data = {
			id: goods.id,
			flag: 2,
			page: 1
		};
		$http.post('/user/cancelgoodsorder.json', data, postCfg)
		.success(function (data) {
			console.log(data);
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				// 订单取消成功
				alert('订单取消成功！');
				$scope.goodsOrderList[$scope.goodsOrderList.indexOf(goods)].state = '已取消';
				$scope.goodsOrderList[$scope.goodsOrderList.indexOf(goods)].stateflag = 2;
			}
		})
		.error(function (data) {
			console.log(data);
			alert('数据请求失败，请稍后再试！');
		});
	};

	$scope.remarkDesigner = function (service) {
		$location.path('remark_designer/' + service.designer.id);
	};

}]);