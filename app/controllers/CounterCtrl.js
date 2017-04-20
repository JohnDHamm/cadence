"use strict";

app.controller("CounterCtrl", function($scope, CounterFactory, $location){

	const counterDiv = document.getElementById('counterDiv');
	const groupBtnDiv = document.getElementById('groupDiv');
	const resultsBtnDiv = document.getElementById('resultsDiv');
	const listBGDiv = document.getElementById('listBG');

	$scope.athletes = [{id: 0, name: "CLARA", result: 0.00},
											{id: 1, name: "LUCY", result: 0.00},
											{id: 2, name: "MAKENNA", result: 0.00},
											{id: 3, name: "MAYA", result: 0.00},
											{id: 4, name: "MILES", result: 0.00},
											{id: 5, name: "TRINITY", result: 0.00},
											{id: 6, name: "RUTH", result: 0.00},
											{id: 7, name: "WELLINGTON", result: 0.00}];
	$scope.showAthleteList = false;
	$scope.showResultList = false;

	$scope.currentAthlete = $scope.athletes[0];
	$scope.avgSecond = 0.00;
	$scope.avgRPM = 0;

	let prevTap = 0,
			latestTap = 0,
			intervals = [];

	$scope.clicked = () => {
		counterDiv.classList.add('animCounter');

		let thisTap = CounterFactory.getTime();

		if (prevTap === 0) {
			console.log("restarting for new athlete");
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
			$scope.athletes[$scope.currentAthlete.id].result = $scope.avgSecond;  //save last result
			console.log("last result", $scope.athletes[$scope.currentAthlete.id].result);
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
		$scope.avgSecond = $scope.athletes[index].result.toFixed(2);
		$scope.showAthleteList = false;
	}

	$scope.resetCounter = () => {
		counterDiv.classList.remove('animCounter');
		clearCounter($scope.currentAthlete.id);
	}

	const clearCounter = (index) => {
		$scope.athletes[index].result = 0.00;  //clear result
		prevTap = 0; //clear counter
		intervals = [];
		$scope.avgSecond = 0.00;
		$scope.avgRPM = 0;
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
			$scope.athletes[i].result = 0;
		}
	}



});
