index.controller('nonExistentCtrl',
    ['$scope', '$http', '$location', '$rootScope', '$window','$timeout',
    function ($scope, $http, $location, $rootScope, $window,$timeout) {
    // 跳转到首页
    // setTimeout(function(){
    //     $location.path('/');
    //     $scope.$apply();
    // },2500);
    $timeout(function () {
        $location.path('/');
    },2500);
}]);