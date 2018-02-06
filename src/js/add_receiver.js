index.controller('addReceiverCtrl',
	['$scope', '$http', '$location', '$rootScope', '$window',
	function ($scope, $http, $location, $rootScope, $window) {
	$scope.defaultAddress=false;
	// 初始化判断是否有值传过来
	function init() {
		if ($location.search().addr_id) {
			$scope.id = $location.search().addr_id;
			// 通过id获取地址
			$http.post('/user/getaddressbyid.json', {id: $location.search().addr_id}, postCfg)
			.success(function (data) {
				if (-1 === data.code) {
					$rootScope.preUrl = $location.url();
					$location.path('fast_login');
				}
				else if (1 === data.code) {
					var addr = data.data;
					$scope.name = addr.name;
					$scope.phone = addr.telephone;
					$scope.city = addr.city;
					$scope.address = addr.address;
				}
			})
			.error(function (data) {
				// console.log(data);
			});
		}
	}

	init();

	$scope.save = function () {
		var loading = weui.loading('提交中');
		if($scope.defaultAddress){
			$scope.defaultflag=1;
		}else{
			$scope.defaultflag=0;
		}
		var data = {
			name: $scope.name,
			telephone: $scope.phone,
			cityinfo: $scope.city,
			address: $scope.address,
			defaultflag:$scope.defaultflag
		},
		    postUrl = '/user/addaddress.json';
		// 判断更新地址还是添加新地址
		if ($scope.id) {
			data.id = $scope.id;
			postUrl = '/user/updateaddress.json';
		}
		$http.post(postUrl, data, postCfg)
		.then(function (resp) {
			loading.hide();
			if (-1 === resp.data.code) {
				// 用户未登录
				$rootScope.preUrl = $location.url();
				$location.path('fast_login');
			}
			else if (1 === resp.data.code) {
				if($scope.id){
					weui.toast('修改地址成功！', {
                        duration: 1500,
                        className: "bears"
                    });
					$window.history.back();
				}else{
					weui.toast('添加地址成功！', {
                        duration: 1500,
                        className: "bears"
                    });
					$window.history.back();
				}
			}
		}, function (resp) {
			console.log(resp);
		});
	};

	$scope.setDefault=function(index){
		switch(index){
			case 0:
				$scope.defaultAddress=false;
				break;
			case 1:
				$scope.defaultAddress=true;
				break;
		}
	};
	var area1 = new LArea();
    area1.init({
        'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#value1', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'id',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': LAreaData //数据源
    });
    area1.value=[0,10,1];//控制初始位置，注意：该方法并不会影响到input的value
}]);