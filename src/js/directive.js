// 使用swiper插件制作图片轮播directive,这是广告的directive
index.directive('advertise', ['$timeout', function ($timeout) {
	return {
		restrict: 'EA',
		replace: true,
		link: function (scope, element, attrs) {
			// 所有图片加载完毕后才执行swiper的初始化
			scope.deferred.promise.then(function (msg) {
				scope.advertiseSwiper = new Swiper(element.get(0), {
					direction: 'horizontal',
					speed: 300,
					autoplay: 4000,
					loop: true,
					autoplayDisableOnInteraction: false,
					pagination: '.swiper-pagination'
				});
			});
		}
	};
}]);


// 明星造型师directive
index.directive('designer', ['$timeout', function ($timeout) {
	return {
		restrict: 'EA',
		replace: true,
		link: function (scope, element, attrs) {
			scope.designerDeferred.promise.then(function (msg) {
				scope.designerSwiper = new Swiper(element.get(0), {
					direction: 'horizontal',
					effect: 'coverflow',
			        grabCursor: true,
			        centeredSlides: true,
			        slidesPerView: 'auto',
			        coverflow: {
			            rotate: 50,
			            stretch: 0,
			            depth: 100,
			            modifier: 1,
			            slideShadows : true
			        }
				});
			});
		}
	};
}]);

// 店内活动轮播directive
index.directive('activity', ['$timeout', function ($timeout) {
	return {
		restrict: 'EA',
		replace: true,
		link: function (scope, element, attrs) {
			// 所有图片加载完毕后才执行swiper的初始化
			scope.activityDeferred.promise.then(function (msg) {
				scope.activitySwiper = new Swiper(element.get(0), {
					direction: 'horizontal',
					speed: 300,
					autoplay: 4000,
					loop: true,
					autoplayDisableOnInteraction: false,
					pagination: '.swiper-pagination'
				});
			});
		}
	};
}]);

// 限时抢购directive
index.directive('flashsale', ['$timeout', function ($timeout) {
	return {
		restrict: 'EA',
		replace: true,
		link: function (scope, element, attrs) {
			scope.flashSaleDeferred.promise.then(function (msg) {
				scope.falshSaleSwiper = new Swiper(element.get(0), {
					direction: 'horizontal',
					slidesPerView: 'auto',
			        paginationClickable: true,
			        spaceBetween: 30,
			        freeMode: true
				});
			});
		}
};
}]);

// 返回directive
index.directive('back', ['$window', function ($window) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				$window.history.back();
			});
		}
	};
}]);

// 判断广告轮播图是否加载完
index.directive('onFinishRenderFilters', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	};
}]);

// 判断明星发型师是否加载完
index.directive('onDesignerRenderFinished', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('designerRepeatFinished');
				});
			}
		}
	};
}]);

// 判断限时抢购是否加载完
index.directive('onFlashSaleRenderFinished', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('flashSaleRepeatFinished');
				});
			}
		}
	};
}]);

// 判断限时抢购是否加载完
index.directive('onActivityFinished', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('activityFinished');
				});
			}
		}
	};
}]);

// 禁止滑动的directive
index.directive('forbidScroll', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element.on('touchmove', function (e) {
				e.preventDefault();
			});
		}
	};
}]);