/**
 * Created by hugotan on 2016/4/9.
 */
angular.module('completeInfo', ['ngFileUpload']).controller('completeInfoCtrl',
	['$scope', '$http', '$window', 'Upload', function ($scope, $http, $window, Upload) {

	var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };
	$scope.complete = function () {
		console.log('完成');
		var data = {
			avatar: $scope.avatar,
			nickname: $scope.nickname,
			sexflag: $scope.sexflag,
			birthday: $scope.birthday
		};
		Upload.upload({
			url: '/user/edit.json',
			data: data
		}).then(function (resp) {
			console.log(resp);
		}, function (resp) {
			console.log(resp);
		});
	};
}]);
