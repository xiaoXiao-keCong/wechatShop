/**
 * Created by hugotan on 2016/4/11.
 */
index.controller('collectionCtrl', ['$scope', '$http', function ($scope, $http) {

	var picBaseUrl = 'http://photo.yueyishujia.com:8112';
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        };

    $scope.isDesigner = true; 
    var designerPromise = $http.post('/user/mykeepdesigner.json', postCfg);
    designerPromise.then(function (resp) {
    	var designerList = resp.data.data.designerlist;
    	// 对图片地址添加前缀
    	for (var i = 0, j = designerList.length; i < j; i++) {
    		designerList[i].imgurl = picBaseUrl + designerList[i].imgurl;
    	}
    	$scope.designerList = designerList;
    	console.log(designerList);
    }, function (resp) {
    	console.log(resp);
    });
}]);