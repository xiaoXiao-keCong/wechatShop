/**
 * Created by hugotan on 2016/4/30.
 */
index.controller('stylistDetailCtrl', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {

	var priceShowed = false,
		lifeShowed = false,
		workShowed = false;

	$scope.project = true;
	$scope.show = function (index) {
		$scope.project = (1 === index ? true : false);
		$scope.price = (2 === index ? true : false);
		$scope.life = (3 === index ? true :false);
		$scope.work = (4 === index ? true : false);
		switch (index) {
			case 2:
				break;
			case 3:
				if (lifeShowed !== true) {
					lifeShowed = true;
					getLife();
				}
				break;
			case 4:
				if (workShowed !== true) {
					workShowed = true;
					getWorks();
				}
				break;
		}
	};

	// 获取发型师详情
	$http.post('/designer/info.json', {'designerid': $routeParams.id}, postCfg)
	.then(function (resp) {
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
			designer.imgurl = picBasePath + designer.imgurl;
			$scope.designer = designer;
			console.log(designer);
		}
	}, function (resp) {
		console.log(resp);
	});

	// 初始化就要获取发型师项目
	$http.post('/designer/service.json', postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			var serviceList = resp.data.data.servicelist;
			for (var i = 0, j = serviceList.length; i < j; i++) {
				serviceList[i].serviceTime = serviceList[i].length * 30;
				serviceList[i].selected = false;
			}
			$scope.serviceList = serviceList;
			// 计算总的服务时间
			$scope.totalServiceTime = function () {
				var totalTime = 0;
				for (var i = 0, j = $scope.serviceList.length; i < j; i++) {
					if ($scope.serviceList[i].selected === true) {
						totalTime += $scope.serviceList[i].serviceTime;
					}
				}
				return totalTime;
			};
		}
	}, function (resp) {
		console.log(resp);
	});

	// 获取发型师作品
	function getWorks() {
		var data = {
			designerid: $routeParams.id,
			page: 1
		};
		$http.post('/designer/work.json', data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				var workList = resp.data.data.designerworklist;
				$scope.workList = workList;
			}
		}, function (resp) {
			console.log(resp);
		});
	}

	// 获取发型师生活
	function getLife() {
		var data = {
			designerid: $routeParams.id,
			page: 1
		};
		$http.post('/designer/life.json', data, postCfg)
		.then(function (resp) {
			console.log(resp);
			if (1 === resp.data.code) {
				var LifeList = resp.data.data.designerlifelist;
				$scope.LifeList = LifeList;
			}
		}, function (resp) {
			console.log(resp);
		});
	}

	// 选择发型师项目
	$scope.selectService = function (service) {
		service.selected = !service.selected;
	};

	// 关注发型师
	

}]);
