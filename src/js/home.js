/**
 * Created by hugotan on 2016/5/4.
 */
index.controller('homeCtrl',
	['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

	$scope.adList = [{'imgurl': '../../assets/images/test/home_ad.png', 'style': 'left: 0;'},
	{'imgurl': '../../assets/images/test/home_ad.png', 'style': 'left: 100%;'},
	{'imgurl': '../../assets/images/test/home_ad.png', 'style': 'left: 200%;'},
	{'imgurl': '../../assets/images/test/home_ad.png', 'style': 'left: 300%;'}];

	$scope.toMore = function (index) {
		switch (index) {
			case 1:
				// 发型师
				$location.path('stylist');
				break;
			case 2:
				// 门店
				$location.path('store');
				break;
			case 3:
				// 时尚资讯
				$location.path('fashion_information');
				break;
			case 4:
				// 悦尚城
				$location.path('mall');
				break;
			case 5:
				// 时尚发型
				$location.path('fashion_hairstyle');
				break;
		}
	};
	$scope.navigate = function (index) {
		switch (index) {
			case 1:
				$location.path('/');
				break;
			case 2:
				$location.path('stylist');
				break;
			case 3:
				$location.path('appointment');
				break;
			case 4:
				$location.path('order');
				break;
			case 5:
				$location.path('my');
				break;
		}
	};
	
}]);