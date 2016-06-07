/**
 * Created by hugotan on 2016/4/30.
 */
index.controller('stylistDetailCtrl',
	['$scope', '$routeParams', '$http', '$location', '$window',
	function ($scope, $routeParams, $http, $location, $window) {

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

	// 初始化就要获取发型师项目
	$http.post('/designer/service.json', {'designerid': parseInt($routeParams.id)}, postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			var serviceList = resp.data.data.servicelist;
			for (var i = 0, j = serviceList.length; i < j; i++) {
				serviceList[i].serviceTime = serviceList[i].length;
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

	// 关注（收藏）或者取消关注（取消收藏）发型师
	$scope.keepDesigner = function (designer) {
		var postUrl = designer.iskeep ? '/designer/unkeep.json' : '/designer/keep.json';
		$http.post(postUrl, {designerid: designer.id}, postCfg)
		.success(function (data) {
			if (-1 === data.code) {
				$location.path('login');
			}
			else if (1 === data.code) {
				$scope.designer.iskeep = !$scope.designer.iskeep;
			}
		})
		.error(function (data) {
			console.log(data);
		});
	};

	// 跳转到发型师更多介绍页面
	$scope.designerIntro = function (designer) {
		$window.location.href = designer.storyurl;
	};

	// 跳转到发型师评论页面
	$scope.toDesignerComment = function (designer) {
		console.log(designer);
		$location.path('stylist_comment/' + designer.id);
	};

}]);
