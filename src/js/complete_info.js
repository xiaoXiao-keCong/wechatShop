/**
 * Created by hugotan on 2016/4/9.
 */
index.controller('completeInfoCtrl',
	['$scope', '$http', '$window', 'Upload', '$location',
	function ($scope, $http, $window, Upload, $location) {

	// 性别默认为男
	$scope.sexFlag = 0;
	// 设置性别
	$scope.setSexFlag = function (flag) {
		$scope.sexFlag = flag;
	};
	
	$scope.complete = function () {
		console.log($scope.nickname);
		if (!$scope.nickname || $scope.nickname === '') {
			alert('请输入您的昵称');
			return;
		}
		var data = {
			avatar: $scope.avatar,
			nickname: $scope.nickname,
			sexflag: $scope.sexFlag,
			birthday: $scope.birthday
		};
		Upload.upload({
			url: '/user/edit.json',
			data: data
		}).then(function (resp) {
			console.log(resp);
			if (-1 === resp.data.code) {
				$location.path('login');
				return;
			}
			if (1 === resp.data.code) {
				sessionStorage.setItem('user', JSON.stringify(resp.data.data));
				alert('信息提交成功!');
				$location.path('/').replace();
			}
		}, function (resp) {
			console.log(resp);
		});
	};
}]);
