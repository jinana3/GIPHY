//code borrowed from class activities 10, 12 and 14 from 06-Ajax

//---------------------functions ----------------------------------------//

// Function for displaying buttons
function renderButtons(searchArray) {

	// Deleting the list of buttons prior to adding new buttons
	// (this is necessary otherwise you will have repeat buttons)
	$("#buttons-view").empty();

	// Looping through the array
	for (var i = 0; i < searchArray.length; i++) {

		// Then dynamicaly generating buttons for each element in array
		// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class of gif-btn to our button
		a.addClass("gif-btn");
		// Adding a data-attribute
		a.attr("data-name", searchArray[i]);
		// Providing the initial button text
		a.text(searchArray[i]);
		// Adding the button to the buttons-view div
		$("#buttons-view").append(a);
	}
}

// function to put user input as button
function userInputButton (searchArray){
	// This line grabs the input from the textbox
	var input = $("#gif-input").val().trim();
	// Adding search term from the textbox to our array
	if(input !== ""){
		searchArray.push(input);
	}
	else{
		alert("you didn't input anything!");
	}
}

// displayInfo function to display gifs associated with search term
function displayInfo() {

	$("#gif-view").empty();

	var search = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=X66quLDPO2ujBDgQBAjmN237X3GLAbDG&limit=10";

	// Creating an AJAX call for the specific search term button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {

		//save response in results variable
		var results = response.data;
		//loop through 10 results to create image tags and append them to gifbox
		for(var i = 0; i<results.length; i++){

			//each gif receives its own div
			var gifDIV = $("<div>");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			var gifImage = $("<img>");

			//each gif Image has animated and still attributes
			gifImage.addClass("gif");
			gifImage.attr("src", results[i].images.fixed_height.url);
			gifImage.attr("image-still", results[i].images.fixed_height_still.url);
			gifImage.attr("image-animated", results[i].images.fixed_height.url);
			gifImage.attr("image-state", "animated");

			//append the gif and its rating to its own gif div
			gifDIV.append(p);
			gifDIV.append(gifImage);

			//append the overall gif div to the viewing space
			$("#gif-view").append(gifDIV);
		}

	});

}

//function to toggle between gif's still and animated states
function gifState() {

	//get the attribute that says which state the gif is in
	var state = $(this).attr("image-state");

	//check the states and turn on the opposite state, update current state status
	if (state === "still"){
	  $(this).attr("src", $(this).attr("image-animated"));
	  $(this).attr("image-state", "animated");
	}
	else{
	  $(this).attr("src", $(this).attr("image-still"));
	  $(this).attr("image-state", "still");
	}
}



//---------------------------------apply to app-------------------------------------//

$( document ).ready(function() {
	// Initial array of travel destinations to start the program
	var destinations = ["Canada", "Mexico", "China", "National Parks"];

	// Calling the renderButtons function to display the intial buttons
	renderButtons(destinations);

	// This function handles events where add gifs is clicked
	$("#add-gif").on("click", function(event) {
		event.preventDefault();
		userInputButton (destinations);
		// Calling renderButtons which handles the processing of our array
		renderButtons(destinations);
	});

	// Adding a click event listener to all elements with a class of "gif-btn", to display gifs
	$(document).on("click", ".gif-btn", displayInfo);

	// Add another click event listener to all elements with a class of "gif", to turn on and off animation
	$(document).on("click", ".gif", gifState);
});


//-----------------end---------------------//