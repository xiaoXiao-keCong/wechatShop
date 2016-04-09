/**
 * Created by hugotan on 2016/4/9.
 */
angular.module('fastLogin', []).controller('fastLoginCtrl', function ($scope) {
    $scope.outsideLogin = function (e) {
        alert('点击' + e.target.alt);
    };
});