/**
 * Created by hugotan on 2016/4/11.
 */
var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBasePath = 'http://photo.yueyishujia.com:8112';
var index = angular.module('index',
	['ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures', 'ngFileUpload', 'infinite-scroll']);
index.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../html/home.html',
			controller: 'homeCtrl'
		})
		.when('/stylist', {
			templateUrl: '../html/stylist.html',
			controller: 'stylistCtrl'
		})
		.when('/appointment', {
			templateUrl: '../html/appointment.html',
			controller: 'appointmentCtrl'
		})
		.when('/order', {
			templateUrl: '../html/order.html',
			controller: 'orderCtrl'
		})
		.when('/my', {
			templateUrl: '../html/my.html',
			controller: 'myCtrl'
		})
		.when('/login', {
			templateUrl: '../html/login.html',
			controller: 'loginCtrl'
		})
		.when('/register', {
			templateUrl: '../html/register.html',
			controller: 'registerCtrl'
		})
		.when('/fast_login', {
			templateUrl: '../html/fast_login.html',
			controller: 'fastLoginCtrl'
		})
		.when('/forget_pwd', {
			templateUrl: '../html/forget_pwd.html',
			controller: 'forgetPwdCtrl'
		})
		.when('/addr_manage', {
			templateUrl: '../html/addr_manage.html',
			controller: 'addrManageCtrl'
		})
		.when('/add_receiver', {
			templateUrl: '../html/add_receiver.html',
			controller: 'addReceiverCtrl'
		})
		.when('/setting', {
			templateUrl: '../html/setting.html',
			controller: 'settingCtrl'
		})
		.when('/address', {
			templateUrl: '../html/address.html',
			controller: 'addressCtrl'
		})
		.when('/cart', {
			templateUrl: '../html/cart.html',
			controller: 'cartCtrl'
		})
		.when('/balance', {
			templateUrl: '../html/balance.html',
			controller: 'balanceCtrl'
		})
		.when('/collection', {
			templateUrl: '../html/collection.html',
			controller: 'collectionCtrl'
		})
		.when('/complete_info', {
			templateUrl: '../html/complete_info.html',
			controller: 'completeInfoCtrl'
		})
		.when('/recharge', {
			templateUrl: '../html/recharge.html',
			controller: 'rechargeCtrl'
		})
		.when('/coupon', {
			templateUrl: '../html/coupon.html',
			controller: 'couponCtrl'
		})
		.when('/activity', {
			templateUrl: '../html/activity.html',
			controller: 'activityCtrl'
		})
		.when('/point_mall', {
			templateUrl: '../html/point_mall.html',
			controller: 'pointMallCtrl'
		})
		.when('/point_goods_detail/:id', {
			templateUrl: '../html/point_goods_detail.html',
			controller: 'pointGoodsDetailCtrl'
		})
		.when('/point_order_confirm', {
			templateUrl: '../html/point_order_confirm.html',
			controller: 'pointOrderConfirmCtrl'
		})
		.when('/order_confirm/:goods_id/:buy_num', {
			templateUrl: '../html/order_confirm.html',
			controller: 'orderConfirmCtrl'
		})
		.when('/change_tip', {
			templateUrl: '../html/change_tip.html',
			controller: 'changeTipCtrl'
		})
		.when('/pay_recharge', {
			templateUrl: '../html/pay_recharge.html',
			controller: 'payRechargeCtrl'
		})
		.when('/pay_goods/:order_id', {
			templateUrl: '../html/pay_goods.html',
			controller: 'payGoodsCtrl'
		})
		.when('/mall', {
			templateUrl: '../html/mall.html',
			controller: 'mallCtrl'
		})
		.when('/store', {
			templateUrl: '../html/store.html',
			controller: 'storeCtrl'
		})
		.when('/store_detail/:store_id', {
			templateUrl: '../html/store_detail.html',
			controller: 'storeDetailCtrl'
		})
		.when('/order_detail', {
			templateUrl: '../html/order_detail.html',
			controller: 'orderDetailCtrl'
		})
		.when('/mall_goods_detail/:id', {
			templateUrl: '../html/mall_goods_detail.html',
			controller: 'mallGoodsDetailCtrl'
		})
		.when('/fashion_hairstyle', {
			templateUrl: '../html/fashion_hairstyle.html',
			controller: 'fashionHairStyleCtrl'
		})
		.when('/fashion_information', {
			templateUrl: '../html/fashion_information.html',
			controller: 'fashionInformationCtrl'
		})
		.when('/fashion_hair_info/:hairId', {
			templateUrl: '../html/fashion_hair_info.html',
			controller: 'fashionHairInfoCtrl'
		})
		.when('/stylist_detail/:id', {
			templateUrl: '../html/stylist_detail.html',
			controller: 'stylistDetailCtrl'
		})
		.when('/stylist_comment/:id', {
			templateUrl: '../html/stylist_comment.html',
			controller: 'stylistCommentCtrl'
		})
		.when('/order_comment', {
			templateUrl: '../html/order_comment.html',
			controller: 'orderCommentCtrl'
		})
		.when('/select_datetime/:designer_id', {
			templateUrl: '../html/select_datetime.html',
			controller: 'selectDatetimeCtrl'
		})
		.when('/appoint_confirm', {
			templateUrl: '../html/appoint_confirm.html',
			controller: 'appointConfirmCtrl'
		})
		.when('/goods_comment/:id', {
			templateUrl: '../html/goods_comment.html',
			controller: 'goodsCommentCtrl'
		})
		.when('/home_search', {
			templateUrl: '../html/home_search.html',
			controller: 'homeSearchCtrl'
		})
		.when('/designer_search', {
			templateUrl: '../html/designer_search.html',
			controller: 'designerSearchCtrl'
		})
		.when('/remark_designer/:id', {
			templateUrl: '../html/remark_designer.html',
			controller: 'remarkDesignerCtrl'
		})
		.when('/store_search', {
			templateUrl: '../html/store_search.html',
			controller: 'storeSearchCtrl'
		})
		.when('/mall_search', {
			templateUrl: '../html/mall_search.html',
			controller: 'mallSearchCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

// 创建一个公共服务
index.service('commonService', [function () {
	var selecrSite;
	this.getSite = function () {
		return this.selectSite;
	};
	this.setSite = function (site) {
		this.selectSite = site;
	};
}]);

