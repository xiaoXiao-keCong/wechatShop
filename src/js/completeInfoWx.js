index.controller('completeInfoWxCtrl',
	['$scope', '$http', '$window', 'Upload', '$location', '$routeParams',
	function ($scope, $http, $window, Upload, $location, $routeParams) {
	
	$scope.complete = function () {
		var phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		if (!phoneRe.test($scope.phone)) {
            // alert('手机号无效！');
            weui.alert('手机号无效！', function () {
		    }, {
		        title: '温馨提示'
		    });
            return;
        }
		var data = {
			telephone: $scope.phone,
			birthday: $scope.birthday
		};
		Upload.upload({
			url: '/user/edit.json',
			data: data
		}).then(function (resp) {
			if (-1 === resp.data.code) {
				$location.path('fast_login');
				return;
			}
			if (1 === resp.data.code) {
				sessionStorage.setItem('user', JSON.stringify(resp.data.data));
				// alert('信息提交成功!');
				weui.toast('信息提交成功!', {
                    duration: 1500,
                    className: "bears"
                });
				$location.path('/').replace();
			}
		}, function (resp) {
		    // alert('数据请求失败，请稍后再试！');
		});
	};
}]);
