//IMPORTANT!
$(document).ready(function(){

// INITIALIZING FIREBASE
// ================

	var config = {
		apiKey: "AIzaSyCfjkx7s9u5xqmTYaHgSMoJl8YL9qnFTKY",
		authDomain: "train-scheduler-56479.firebaseapp.com",
		databaseURL: "https://train-scheduler-56479.firebaseio.com",
		projectId: "train-scheduler-56479",
		storageBucket: "train-scheduler-56479.appspot.com",
		messagingSenderId: "65819523727"
	};

	firebase.initializeApp(config);

// GLOBAL VARIABLES
// ================

	//Creating a variable to hold the firebase databaseURL
	var fireDatabase = firebase.database();

	//Global Vars
	var userInptTrainName;
	var userInptDestination;
	var userInptFirstTT;
	var userInptFreq;
	var userInptNOW;

	//Variables to be used later wit momentjs
	var nextArrival;
	var minutesAway;

// FUNCTIONS
// ============
function calcMinutesElapsed() {
	var convertedFirstTrainTime = moment(userInptFirstTT, "HH:mm").subtract(1, "years");
	return moment().diff(moment(convertedFirstTrainTime), "minutes");
}

function calcMinutesAway(minutesElapsed, userInptFreq) {
	return parseInt(userInptFreq) - parseInt(minutesElapsed) % parseInt(userInptFreq);
}

function calcNextArrival(minutesAway) {
	return moment().add(minutesAway, "m").format("hh:mm A");
}

// MAIN PROCESS
// ============

	// Capture button click
	$("#submitBttn").on("click", function(event) {

		// This prevents the form from trying to submit itself and reseting the page.
		event.preventDefault();

		//Capture the user's input for each field and store into variable.
		userInptTrainName = $("#trainName").val().trim();
		userInptDestination = $("#destination").val().trim();
		userInptFirstTT = $("#firstTrainTime").val().trim();
		userInptFreq = $("#frequency").val().trim();
		userInptNOW = new Date();

		//Create a new local "temporary" object for holding train data
		var newTrain = {
			dataTrainName: userInptTrainName,
			dataDestination: userInptDestination,
			dataFirstTrainTime: userInptFirstTT,
			dataFrequency: userInptFreq,
			dataTimeAdded: userInptNOW
		};

		//Adding information to the Firebase database
		firebase.database().ref().push(newTrain);

		//Log everything from the database
		console.log("Your train's name is: " + newTrain.dataTrainName);
		console.log("Your train's destination is: " + newTrain.dataDestination);
		console.log("Your train first arrived at: " + newTrain.dataFirstTrainTime);
		console.log("Your train's frequency is every " + newTrain.dataFrequency + " minutes.");
		console.log("Your train's was added at: " + newTrain.dataTimeAdded);

		//Alert
		alert("Your train was successfully added to the Schedule");

	});

	//With a listener, capture when a new item has been added to the database.
	firebase.database().ref().on("child_added", function(childSnapshot) {

		//Store everything inoto a variable
		var name = childSnapshot.val().dataTrainName;
		var dest = childSnapshot.val().dataDestination;
		var freq = childSnapshot.val().dataFrequency;

		var first = childSnapshot.val().dataFirstTrainTime;
		var now = childSnapshot.val().dataTimeAdded;

		//Calculate the amount of minutes elapsed since the first train's arrival
		var minutesSinceFirstTrane = calcMinutesElapsed();
		console.log("Total minutes elapsed since the first train arrived: " + minutesSinceFirstTrane);

		//calculate how many minutes away is the next train
		minutesAway = calcMinutesAway(minutesSinceFirstTrane, userInptFreq);
		console.log("The next train will be here in: " + minutesAway +" minutes.");

		//Whenever current time matches next arrival time
		if (minutesAway === parseInt(userInptFreq)) {
			minutesAway = 0;
		}



		//Calculate the next arrival's time
		nextArrival = calcNextArrival(minutesAway);
		console.log("The next train will be here at: " + nextArrival);

		//Create a variable that HOLDS the new row
		var newRowItem = $("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

		//Get the table and add new row to table at the end
		$("table tbody").append(newRowItem);

	});

}); //IMPORTANT!
