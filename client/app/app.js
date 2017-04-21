"use strict";

const app = angular.module("CadenceApp", ["ngRoute", "ngStorage"])
	.config($routeProvider => {

	$routeProvider
		.when('/', {
			templateUrl: 'partials/counter.html',
			controller: 'CounterCtrl'
		})
		.otherwise('/', {
		})

});
