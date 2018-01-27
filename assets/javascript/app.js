$( document ).ready(function() {

	// Global Variables

	var gifs = ["skateboarding", "hair metal", "mma", "overwatch", "gaming"];

	// FUNCTIONS

	// Renders buttons from gifs array
	function renderButtons() {
		$("#buttons-view").empty();

		for (var i = 0; i < gifs.length; i++) {
			var b = $("<button>");
			b.addClass("gif");
			b.attr("data-category", gifs[i]);
			a.text(gifs[i]);
			$("#buttons-view").append(b);
		}
	}

	function displayGifs() {
		var category = $(this).attr("data-category");

		// Example queryURL for Giphy API
		var queryURL = "https://api.giphy.com/v1/gifs/?q=" + category + "&api_key=dc6zaTOxFJmzC";

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			console.log(response);
			// console.log(response.data[0].images.fixed_height.url)
		});
	}

	// Adds category button from user input form
	$("#add-gif").on("click", function(event) {
		event.preventDefault();
		var category = $("#gif-input").val().trim();
		gifs.push(category);
		renderButtons();
	});

	// Call displayGifs function when buttons are clicked
	$(document).on("click", ".gif", displayGifs);

	renderButtons();
});