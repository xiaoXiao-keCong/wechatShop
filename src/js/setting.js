/**
 * Created by hugotan on 2016/4/2.
 */
angular.module('setting', []).controller('settingCtrl', function ($scope) {
    $scope.toNeedKnow = function () {
    	console.log('need-to-know is clicking');
    };
});