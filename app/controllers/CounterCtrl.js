"use strict";

app.controller("CounterCtrl", function($scope, CounterFactory, $location){

	const counterDiv = document.getElementById('counterDiv');

	$scope.athletes = [{id: 0, name: "Clara", result: 0.00},
											{id: 1, name: "Lucy", result: 0.00},
											{id: 2, name: "Makenna", result: 0.00},
											{id: 3, name: "Maya", result: 0.00},
											{id: 4, name: "Miles", result: 0.00},
											{id: 5, name: "Trinity", result: 0.00},
											{id: 6, name: "Ruth", result: 0.00},
											{id: 7, name: "Wellington", result: 0.00}];
	$scope.showAthleteList = true;
	$scope.showResultList = false;

	$scope.currentAthlete = {name: ""};
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
		$scope.showResultList = false;
		$scope.showAthleteList = true;
	}

	$scope.selectAthlete = (index) => {
		clearCounter(index);
		$scope.currentAthlete = $scope.athletes[index];
		$scope.avgSecond = $scope.athletes[index].result.toFixed(2);
		$scope.showAthleteList = false;
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
		$scope.showResultList ?
			($scope.showAthleteList = true,
				$scope.showResultList = false) : $scope.showResultList = true;
		// $scope.showResultList = !$scope.showResultList;
	}



});
