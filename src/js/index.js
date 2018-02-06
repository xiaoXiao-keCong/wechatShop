var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBasePath = 'http://photo.yueyishujia.com:8115';
var index = angular.module('index',
	['ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures', 'ngFileUpload', 'infinite-scroll']);
index.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '../html/mall.html',
			controller: 'mallCtrl'
		})
		.when('/mall_search', {
			templateUrl: '../html/mall_search.html',
			controller: 'mallSearchCtrl'
		})
		.when('/my', {
			templateUrl: '../html/my.html',
			controller: 'myCtrl'
		})
		.when('/cart', {
			templateUrl: '../html/cart.html',
			controller: 'cartCtrl'
		})
		.when('/classification', {
			templateUrl: '../html/classification.html',
			controller: 'classificationCtrl'
		})
		.when('/order', {
			templateUrl: '../html/order.html',
			controller: 'orderCtrl'
		})
		.when('/fast_login', {
			templateUrl: '../html/fast_login.html',
			controller: 'fastLoginCtrl'
		})
		.when('/collection', {
			templateUrl: '../html/collection.html',
			controller: 'collectionCtrl'
		})
		.when('/address', {
			templateUrl: '../html/address.html',
			controller: 'addressCtrl'
		})
		.when('/add_receiver', {
			templateUrl: '../html/add_receiver.html',
			controller: 'addReceiverCtrl'
		})
		.when('/helpcenter', {
			templateUrl: '../html/helpcenter.html',
			controller: 'helpcenterCtrl'
		})
		.when('/aboutus', {
			templateUrl: '../html/aboutus.html',
			controller: 'aboutusCtrl'
		})
		.when('/mall_goods_detail/:id', {
			templateUrl: '../html/mall_goods_detail.html',
			controller: 'mallGoodsDetailCtrl'
		})
		.when('/themeDetail/:id', {
			templateUrl: '../html/themeDetail.html',
			controller: 'themeDetailCtrl'
		})
		.when('/nonExistent', {
			templateUrl: '../html/nonExistent.html',
			controller: 'nonExistentCtrl'
		})
		.when('/order_confirm', {
			templateUrl: '../html/order_confirm.html',
			controller: 'orderConfirmCtrl'
		})
		.when('/select_coupon', {
			templateUrl: '../html/select_coupon.html',
			controller: 'selectCouponCtrl'
		})
		.when('/orderDetail', {
			templateUrl: '../html/orderDetail.html',
			controller: 'orderDetailCtrl'
		})
		.when('/complete_info_wx', {
			templateUrl: 'complete_info_wx.html',
			controller: 'completeInfoWxCtrl'
		})
		.when('/returnGoods', {
			templateUrl: '../html/returnGoods.html',
			controller: 'returnGoodsCtrl'
		})
		.when('/buyvip', {
			templateUrl: '../html/buyvip.html',
			controller: 'buyvipCtrl'
		})
		.otherwise({
			redirectTo: '/nonExistent'
		});
}]);


// 获取地理位置并设置到localStorage中，通过code进行登录
(function init() {
	var code = getUrlParam('code');
	var state = getUrlParam('state');
        
    if (code) {
        // 通过code获取access_token等信息
        var data = {
            appid: 'wx6a71c9758aa42537',
            secret: '04a307f13f2ab8ffac45c02538cedce7',
            code: code,
            grant_type: 'authorization_code'
        };
        $.ajax({
            url: '/sns/oauth2/access_token',
            type: 'GET',
            data: data,
            async: false,
            success: function (resp) {
                resp = JSON.parse(resp);
                if (resp.errcode) {
                  alert(resp.errmsg);
                }
                else {
                  // 获取授权信息成功
                  var tldata = {
                    type: 'wz',
                    token: resp.access_token,
                    openid: resp.openid
                  };
					$.ajax({
			            url: '/user/unl/thirdlogin.json',
			            type: 'GET',
			            data: tldata,
			            async: false,
			            success: function (resp) {
			                if (1 === resp.code) {
								sessionStorage.setItem('login', '1');
	                      		sessionStorage.setItem('user', JSON.stringify(resp.data));
							}else if(2 === resp.code){
								sessionStorage.setItem('login', '1');
	                      		sessionStorage.setItem('user', JSON.stringify(resp.data));
								window.location.href = 'fast_login';
							}
			            },
			            error: function (resp) {
			                alert(resp);
			            }
			        });
                }
            },
            error: function () {
                alert('授权信息获取失败');
            }
        });
    }
	
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
    	alert('当前浏览器不支持navigator.geolacation');
    }
})();

function showPosition(position) {
	var positionx =  position.coords.latitude,
	    positiony =  position.coords.longitude;
	localStorage.setItem('positionx', positionx);
	localStorage.setItem('positiony', positiony);
}

// 获取url参数
function getUrlParam(name){  
    //构造一个含有目标参数的正则表达式对象  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    //匹配目标参数  
    var r = window.location.search.substr(1).match(reg);  
    //返回参数值  
    if (r !== null) return unescape(r[2]);  
    return null;  
} 