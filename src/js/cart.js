/**
 * Created by hugotan on 2016/4/16.
 */
angular.module('cart', []).controller('cartCtrl', function ($scope, $http) {
	var transFn = function(data) {
                return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBaseUrl = 'http://photo.yueyishujia.com:8112';
	var cartPromise = $http.post('/user/mycart.json', postCfg);
	cartPromise.then(function (resp) {
		var data = resp.data;
		if (1 === data.code && 0 < data.data.cartlist.length) {
			var cartList = data.data.cartlist;
			for (var i =0, j  = cartList.length; i < j; i++) {
				cartList[i].goods.imgurl = picBaseUrl + cartList[i].goods.imgurl1;
			}
			$scope.cartList = cartList;
			console.log(cartList);

		}
	}, function (resp) {
		console.log(resp);
	});
});