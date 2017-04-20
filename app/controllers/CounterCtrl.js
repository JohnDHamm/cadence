"use strict";

app.controller("CounterCtrl", function($scope, CounterFactory, $location){

	const counterDiv = document.getElementById('counterDiv');
	const groupBtnDiv = document.getElementById('groupDiv');
	const resultsBtnDiv = document.getElementById('resultsDiv');
	const listBGDiv = document.getElementById('listBG');

	$scope.athletes = [{id: 0, name: "CLARA", resultSec: 0.00},
											{id: 1, name: "LUCY", resultSec: 0.00},
											{id: 2, name: "MAKENNA", resultSec: 0.00},
											{id: 3, name: "MAYA", resultSec: 0.00},
											{id: 4, name: "MILES", resultSec: 0.00},
											{id: 5, name: "TRINITY", resultSec: 0.00},
											{id: 6, name: "RUTH", resultSec: 0.00},
											{id: 7, name: "WELLINGTON", resultSec: 0.00}];
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
			// console.log("restarting for new athlete");
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
			$scope.athletes[$scope.currentAthlete.id].resultSec = avgSecond;  //save last resultSec
			$scope.athletes[$scope.currentAthlete.id].resultRPM = avgRPM;  //save last resultSec
			// console.log("last resultSec", $scope.athletes[$scope.currentAthlete.id].resultSec);
		}
	}

	const calcAverages = () => {
		const sum = intervals.reduce((a, b) => a + b);
		// $scope.athletes[]
		return { avgSecond: (sum / intervals.length).toFixed(2),
						avgRPM: Math.floor(60 / (sum / intervals.length))
					};
	}

	$scope.showAthletes = () => {
		counterDiv.classList.remove('animCounter');
		listBGDiv.style.background = "rgba(55, 0, 0, 0.8)"
		// groupBtnDiv.classList.add('btnSelected');
		// resultsBtnDiv.classList.remove('btnSelected');
		listBGDiv.style.display = "block";
		$scope.showResultList = false;
		$scope.showAthleteList = true;
	}

	$scope.selectAthlete = (index) => {
		// groupBtnDiv.classList.remove('btnSelected');
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
		$scope.athletes[index].resultSec = 0.00;  //clear resultSec
		prevTap = 0; //clear counter
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
				listBGDiv.style.background = "rgba(0, 0, 55, 0.8)"
				);
	}

	$scope.clearAllResults = () => {
		for (let i = 0; i < $scope.athletes.length; i++){
			$scope.athletes[i].resultSec = 0.00;
			$scope.athletes[i].resultRPM = 0;
		}
	}



});
