index.controller('myCtrl',
	['$scope', '$http', '$location', '$rootScope', '$timeout', function ($scope, $http, $location, $rootScope, $timeout) {
	$scope.dzforder=false;
	$scope.dshorder=false;
	(function init() {
		// 请求用户信息
		$http.post('/user/mine.json', postCfg)
		.success(function (resp) {
			// console.log(resp);
			if (-1 === resp.code) {
				// 用户未登录
				$scope.isLogin = false;
			}
			else if (1 === resp.code) {
				$scope.isLogin = true;
				var user = resp.data;
				if(user.avatar === ''){
					user.avatar='../../assets/images/head-none.png';
				}else{
					user.avatar = picBasePath + user.avatar;
				}
				if(user.nickname === ''){
					user.nickname = '暂无昵称';
				}
				$scope.user = user;
                sessionStorage.setItem('user', JSON.stringify(user));
			}
		})
		.error(function (resp) {
			// alert('数据请求失败，请稍后再试！');
		});
	})();
	$scope.toOrder = function (tab){
		$rootScope.activeTab = tab;
		$location.path('order');
	};
	$rootScope.desingopay = 0;
	function checkLogin() {
		if (!sessionStorage.user) {
			// 用户未登录，跳转到登录页面
			$location.path('login');
			return;
		}
		var user = JSON.parse(sessionStorage.user);
		if (user.nickname === '') {
			// 跳转到完善信息
			alert('请填写您的昵称!');
			$location.path('complete_info').search({type: 'modify'});
			return;
		}
	}
	$scope.dzfpage = 1; //待支付
    var dzfdata = {
        page: $scope.dzfpage,
        flag: 0
    };
    $http.post('/order/orderlist.json',dzfdata, postCfg)
    .then(function (resp) {
        if (1 === resp.data.code) {
        	$scope.dzfOrderLength=resp.data.data.orderlist.length;
        	if($scope.dzfOrderLength >= 1){
        		$scope.dzforder=true;
        	}
        	if($scope.dzfOrderLength >= 10){
        		$scope.dzfOrderLength = '9+';
        	}
        }
    }, function (resp) {
        // alert('数据请求失败，请稍后再试！');
    });
    $scope.dshpage = 1; //待收货
    var dshdata = {
        page: $scope.dshpage,
        flag: 2
    };
    $http.post('/order/orderlist.json',dshdata, postCfg)
    .then(function (resp) {
        if (1 === resp.data.code) {
        	$scope.dshOrderLength=resp.data.data.orderlist.length;
        	if($scope.dshOrderLength >= 1){
        		$scope.dshorder=true;
        	}
        	if($scope.dshOrderLength >= 10){
        		$scope.dshOrderLength = '9+';
        	}
        }
    }, function (resp) {
        // alert('数据请求失败，请稍后再试！');
    });
	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				$timeout(function () {
					$location.path('/');
				}, 0);
				break;
			case 2:
				$timeout(function () {
					$location.path('classification');
				}, 0);
				break;
			case 3:
				$timeout(function () {
					$location.path('cart');
				}, 0);
				break;
			case 4:
				$timeout(function () {
					$location.path('my');
				}, 0);
				break;
		}
	};

	$scope.toEditInfo = function () {
		if (!sessionStorage.user) {
			$location.path('login');
			return;
		}
		$location.path('edit_info');
	};

	// 点击悦币跳转到悦币商城
	$scope.toCoinMall = function () {
		$location.path('coin_mall');
	};

	// 点击余额跳转到我的余额
	$scope.toBalance = function () {
		$location.path('my_balance');
	};
}]);