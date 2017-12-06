//IMPORTANT!
$(document).ready(function(){

	// GLOBAL VARIABLES
	// ================

	// FUNCTIONS
	// =========

	// MAIN PROCESS
	// ============

	// Capture button click
	$("#submitBttn").on("click", function(event) {

		// This prevents the form from trying to submit itself and reseting the page.
		event.preventDefault();

		//Capture the user's input for each field and store into variable.
		var userInptTrainName = $("#trainName").val().trim();
		var userInptDestination = $("#destination").val().trim();
		var userInptFirstTT = $("#firstTrainTime").val().trim();
		var userInptFreq = $("#frequency").val().trim();

        // TESTING & DEBUGGING
		console.log(userInptTrainName);
		console.log(userInptDestination);
		console.log(userInptFirstTT);
		console.log(userInptFreq);
	});

}); //IMPORTANT!
