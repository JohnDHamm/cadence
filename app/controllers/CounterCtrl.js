"use strict";

app.controller("CounterCtrl", function($scope, CounterFactory, $location){

	$scope.currentAthlete = "Wellington";
	$scope.avgSecond = '0.00';
	let prevTap = 0,
			latestTap = 0,
			intervals = [];
	$scope.avgRPM = 0;

	$scope.clicked = () => {
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


});
