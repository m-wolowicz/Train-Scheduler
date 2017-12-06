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

	var userInptTrainName;
	var userInptDestination;
	var userInptFirstTT;
	var userInptFreq;
	var userInptNOW;

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

	    // TESTING & DEBUGGING
		console.log("The new Train Name is : " + userInptTrainName);
		console.log("The new Destination is: " + userInptDestination);
		console.log("The First Train's Time (in milliseconds) is: " + moment(userInptFirstTT, "HH:mm").format('hh:mm A'));
		console.log("The frequency of the train is :" + moment(userInptFreq, "mm").format('mm'));
		console.log("The current time in milliseconds is: " + moment(userInptNOW).format("x"));

		//Adding information to the Firebase database
		firebase.database().ref().push({
			dataTrainName: userInptTrainName,
			dataDestination: userInptDestination,
			dataFirstTrainTime: moment(userInptFirstTT, "HH:mm").format('hh:mm A'),
			dataFrequency: moment(userInptFreq, "mm").format('mm'),
			dataTimeAdded: userInptNOW,
		});

		//With a listener, capture when a new item has been added to the database.
		firebase.database().ref().limitToLast(1).on("child_added", function(snapshot) {
			//Printout every new Train into a new row on the table:

				//Create formula to calculate the Minutes Away
				var a = moment(snapshot.val().dataFirstTrainTime, 'hh:mm A').format("x");
					console.log("a: " + a);
				var b = moment(snapshot.val().dataFrequency, "mm").format("x");
					console.log("b: " + b);
				var c = moment(userInptNOW);
					console.log("c: " + c);
				var x = a - c;
					console.log(x);
					moment(x, "x").format('x');
					console.log("The train is " + moment(x).format("mm") + " minutes away");

					var minutesAway = moment(x).format("mm");

				//Create a variable that HOLDS the new row
				var newRowItem = $("<tr><td>" + snapshot.val().dataTrainName + "</td><td>" + snapshot.val().dataDestination + "</td><td>" + snapshot.val().dataFrequency + "</td><td>" + snapshot.val().dataFirstTrainTime + "</td><td>" + minutesAway + "</td></tr>");

				//Get the table and add new row to table at the end
				$("table tbody").append(newRowItem);
		});


	});

}); //IMPORTANT!
