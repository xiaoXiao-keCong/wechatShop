/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('remarkDesignerCtrl',
	['$scope', '$routeParams', '$http', '$location', '$window',
	function ($scope, $routeParams, $http, $location, $window) {
		
	$http.post('/designer/info.json', {'designerid': $routeParams.id}, postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			var commentLevel = [],
				designer = resp.data.data;
			// 暂时未添加图片url前缀
			for (var i = 0; i < designer.score; i++) {
				commentLevel.push({'path': '../../assets/images/star_h.png'});
			}
			for (i = 0; i < 5 - designer.score; i++) {
				commentLevel.push({'path': '../../assets/images/star.png'});
			}
			designer.commentLevel = commentLevel;
			designer.avatar = picBasePath + designer.avatar;
			$scope.designer = designer;
		}
	}, function (resp) {
		console.log(resp);
	});
}]);