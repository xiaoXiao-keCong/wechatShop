/**
 * Created by hugotan on 2016/4/11.
 */
index.controller('collectionCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.isDesigner = true; 
    var designerPromise = $http.post('/user/mykeepdesigner.json', postCfg);
    designerPromise.then(function (resp) {
        console.log(resp);
    	var designerList = resp.data.data.designerlist;
    	// 对图片地址添加前缀
    	for (var i = 0, j = designerList.length; i < j; i++) {
    		designerList[i].imgurl = picBaseUrl + designerList[i].imgurl;
    	}
    	$scope.designerList = designerList;
    }, function (resp) {
    	console.log(resp);
    });

    // 获取收藏的时尚发型
    function getFashionHair() {
        $http.post('/user/mykeepfashionhair.json', postCfg)
        .then(function (resp) {
            console.log(resp);
        }, function (resp) {
            console.log(resp);
        });
    }
}]);