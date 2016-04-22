/**
 * Created by hugotan on 2016/4/16.
 */
angular.module('feedback', []).controller('feedbackCtrl', ['$scope', '$http', function ($scope, $http) {
    var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };

    // 监听值的变化并改变提交按钮的样式
    $scope.$watch('feedback', function (newValue, oldValue, scope) {
        // 去除前后空格
        if ('undefined' === typeof(newValue) ||
            '' === newValue.replace(/(^\s*)|(\s*$)/g, '')) {
            $scope.isFeedbackEmpty = true;
        }
        else {
            $scope.isFeedbackEmpty = false;
        }
    });
    // var couponPromise = $http.post('/user/mycouponlist.json', postCfg);
    $scope.submitFeedback = function () {
        var feedbackText = $scope.feedback.replace(/(^\s*)|(\s*$)/g, ''),
            data = {
                content: feedbackText
            };
        var feedbackPromise = $http.post('/user/feedback.json', data, postCfg);
        feedbackPromise.then(function (resp) {
            if (1 === resp.data.code) {
                alert('提交成功');
            }
        }, function (resp) {
            console.log(resp);
        });
    };
}]);