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
	var userInptTrainName = "";
	var userInptDestination = "";
	var userInptFirstTT = "";
	var userInptFreq = 0;

// FUNCTIONS
// =========

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

	    // TESTING & DEBUGGING
		console.log(userInptTrainName);
		console.log(userInptDestination);
		console.log(userInptFirstTT);
		console.log(userInptFreq);

		//Adding information to the Firebase database
		firebase.database().ref().push({
			dataTrainName: userInptTrainName,
			dataDestination: userInptDestination,
			dataFirstTrainTime: userInptFirstTT,
			dataFrequency: userInptFreq,
			timeAdded: firebase.database.ServerValue.TIMESTAMP
		});

		//With a listener, capture when a new item has been added to the database.
		firebase.database().ref().limitToLast(1).on("child_added", function(snapshot) {
			//Printout every new Train into a new row on the table:
				//Create a variable that HOLDS the new row
				var newRowItem = $("<tr><td>" + snapshot.val().dataTrainName + "</td><td>" + snapshot.val().dataDestination + "</td><td>" + snapshot.val().dataFirstTrainTime + "</td><td>" + snapshot.val().dataFrequency + "</td></tr>");

				//Get the table and add new row to table at the end
				$("table tbody").append(newRowItem);

		});

	});










}); //IMPORTANT!
