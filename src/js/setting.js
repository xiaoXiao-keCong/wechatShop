/**
 * Created by hugotan on 2016/4/2.
 */
angular.module('setting', []).controller('settingCtrl', function ($scope) {
    $scope.toNeedKnow = function () {
    	console.log('need-to-know is clicking');
    };
    $scope.AboutUs = function () {
    	console.log('AboutUs is clicking');
    };
    $scope.Mark = function () {
    	console.log('Mark is clicking');
    };
    $scope.Suggest = function () {
    	console.log('Suggest is clicking');
    };
});

function cacheValue() {
	var str = "5.00M";
	return str;
}