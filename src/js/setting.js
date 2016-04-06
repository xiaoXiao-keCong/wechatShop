/**
 * Created by hugotan on 2016/4/2.
 */
angular.module('setting', []).controller('settingCtrl', function ($scope) {
    $scope.toNeedKnow = function () {
    	console.log('need-to-know is clicking');
    };
    $scope.aboutUs = function () {
    	console.log('AboutUs is clicking');
    };
    $scope.setMark = function () {
    	console.log('Mark is clicking');
    };
    $scope.suggest = function () {
    	console.log('Suggest is clicking');
    };
    $scope.clearCache = function () {
        console.log('ClearCache is clicking');
    };
});

function getCacheValue() {
    var str = "5.00M";
    document.getElementById('cacheValue').innerHTML = str;
}

function versionInfo() {
    var str = "V5.0.0";
    document.getElementById('version').innerHTML = str;
}

function quitClick() {
    console.log('quit click');
}
// test
getCacheValue();
versionInfo();
