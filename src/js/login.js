/**
 * Created by hugotan on 2016/4/2.
 */
angular.module('login', []).controller('loginCtrl', function ($scope) {
    $scope.outsideLogin = function (e) {
        alert('点击' + e.target.alt);
    };
});