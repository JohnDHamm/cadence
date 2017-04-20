"use strict";

app.controller("CounterCtrl", function($scope, CounterFactory, $location){

	const readout = document.getElementById('readoutText');
	const counterDiv = document.getElementById('counterDiv');

	$scope.athletes = ["Clara", "Lucy", "Makenna", "Maya", "Miles", "Trinity", "Wellington"];
	$scope.currentAthlete = "Wellington";
	$scope.showAthleteList = false;
	$scope.avgSecond = '0.00';
	$scope.avgRPM = 0;
	let prevTap = 0,
			latestTap = 0,
			intervals = [];

	$scope.clicked = () => {
		counterDiv.classList.add('animCounter');

		let thisTap = CounterFactory.getTime();

		if (prevTap === 0) {
			prevTap = thisTap;
			latestTap = thisTap;
		} else {
			prevTap = latestTap;
			latestTap = thisTap;
			let thisInterval = ((latestTap - prevTap)/1000);
			intervals.push(thisInterval);
			const averages = calcAverages();
			$scope.avgSecond = averages.avgSecond;
			$scope.avgRPM = averages.avgRPM;
		}
	}

	const calcAverages = () => {
		const sum = intervals.reduce((a, b) => a + b);

		return { avgSecond: (sum / intervals.length).toFixed(2),
						avgRPM: Math.floor(60 / (sum / intervals.length))
					};
	}

	$scope.showAthletes = () => {
		$scope.showAthleteList = true;
		console.log("clicked group");
	}

	$scope.selectAthlete = (index) => {
		console.log("index", index);
	}


});
