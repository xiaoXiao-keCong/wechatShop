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
		.otherwise({
			redirectTo: '/'
		});
}]);


// 获取地理位置并设置到localStorage中，通过code进行登录
(function init() {
	// var wx_url=window.location.href;
	// var wxCode = getUrlParam('code'),
	// 	redirectUrl = getUrlParam('redirect'),
	// 	jobId = getUrlParam('jobid');
	// if (!sessionStorage.getItem('login') || sessionStorage.getItem('wxCode') != wxCode) {
	// 	$.ajax({
	// 		url: '/user/wxpublogin.json',
	// 		type: 'POST',
	// 		dataType: 'JSON',
	// 		async:false,
	// 		data: {code: wxCode},
	// 		success: function (resp) {
	// 			console.log(wx_url);
	// 			if (1 === resp.code) {
	// 				sessionStorage.setItem('login', '1');
	// 				sessionStorage.setItem('wxCode', wxCode);
	// 				var user = resp.data;
	// 				sessionStorage.setItem('user', JSON.stringify(user));
	// 				if (user.telephone === '') {
	// 					// 跳转到完善手机信息页面
	// 					window.location.href = 'index.html/complete_info_wx';
	// 				}
	// 				if (redirectUrl){
	// 					sessionStorage.setItem('reload', '1');
	// 					if(jobId){
	// 						window.location.href = '/webapp/build/html/'+redirectUrl+'?jobid='+jobId;
	// 					}else{
	// 						window.location.href = '/webapp/build/html/'+redirectUrl;
	// 					}
	// 				}
	// 			}else{
	// 			}
	// 		},
	// 		error: function (resp) {
	// 			// alert('数据请求失败，请稍后再试！');
	// 			// location.reload();
	// 		}
	// 	});
	// }
	
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