"use strict";

app.controller("CounterCtrl", function($scope, CounterFactory, $location){

	$scope.currentAthlete = "Wellington"
	$scope.readout = "0.25s / 120 rpm";

	$scope.clicked = () => {
		console.log("clicked!");
	}


});
