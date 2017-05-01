"use strict";

app.controller("CounterCtrl", function($scope, CounterFactory, $location){

	const counterDiv = document.getElementById('counterDiv');
	const listBGDiv = document.getElementById('listBG');

	$scope.athletes = [{id: 0, name: "CLARA"},
											{id: 1, name: "LUCY"},
											{id: 2, name: "MAKENNA"},
											{id: 3, name: "MAYA"},
											{id: 4, name: "MILES"},
											{id: 5, name: "TRINITY"},
											{id: 6, name: "RUTH"},
											{id: 7, name: "WELLINGTON"}];
	$scope.showAthleteList = false;
	$scope.showResultList = false;
	$scope.readout = "tap to start";

	$scope.currentAthlete = $scope.athletes[0];
	let avgSecond = 0.00;
	let avgRPM = 0;

	let prevTap = 0,
			latestTap = 0,
			intervals = [];

	$scope.tapped = () => {
		counterDiv.classList.add('animCounter');

		let thisTap = CounterFactory.getTime();

		if (prevTap === 0) {
			prevTap = thisTap;
			latestTap = thisTap;
			$scope.readout = "started..."
		} else {
			prevTap = latestTap;
			latestTap = thisTap;
			let thisInterval = ((latestTap - prevTap)/1000);
			intervals.push(thisInterval);
			const averages = calcAverages();
			avgSecond = averages.avgSecond;
			avgRPM = averages.avgRPM;
			$scope.readout = `${avgSecond}s / ${avgRPM}rpm`;
			$scope.athletes[$scope.currentAthlete.id].resultSec = avgSecond;
			$scope.athletes[$scope.currentAthlete.id].resultRPM = avgRPM;
		}
	}

	const calcAverages = () => {
		const sum = intervals.reduce((a, b) => a + b);
		return { avgSecond: (sum / intervals.length).toFixed(2),
						avgRPM: Math.floor(60 / (sum / intervals.length))
					};
	}

	$scope.showAthletes = () => {
		counterDiv.classList.remove('animCounter');
		listBGDiv.style.background = "rgba(55, 0, 0, 0.85)"
		listBGDiv.style.display = "block";
		$scope.showResultList = false;
		$scope.showAthleteList = true;
	}

	$scope.selectAthlete = (index) => {
		listBGDiv.style.display = "none";
		clearCounter(index);
		$scope.currentAthlete = $scope.athletes[index];
		$scope.avgSecond = $scope.athletes[index].resultSec.toFixed(2);
		$scope.showAthleteList = false;
	}

	$scope.resetCounter = () => {
		counterDiv.classList.remove('animCounter');
		clearCounter($scope.currentAthlete.id);
	}

	const clearCounter = (index) => {
		$scope.athletes[index].resultSec = 0;
		$scope.athletes[index].resultRPM = 0;
		prevTap = 0;
		intervals = [];
		avgSecond = 0.00;
		avgRPM = 0;
		$scope.readout = "tap to start";
	}

	$scope.showResults = () => {
		counterDiv.classList.remove('animCounter');
		$scope.showResultList ? $scope.showAthletes()
			:
			($scope.showResultList = true,
				$scope.showAthleteList = false,
				listBGDiv.style.display = "block",
				listBGDiv.style.background = "rgba(0, 0, 55, 0.85)"
				);
	}

	$scope.clearAllResults = () => {
		for (let i = 0; i < $scope.athletes.length; i++){
			$scope.athletes[i].resultSec = 0;
			$scope.athletes[i].resultRPM = 0;
		}
	}



});
