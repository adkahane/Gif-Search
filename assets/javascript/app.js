$( document ).ready(function() {

	// Global Variables

	var gifs = ["skateboarding", "hair metal", "mma", "overwatch", "gaming"];

	// FUNCTIONS

	// Renders buttons from gifs array
	function renderButtons() {
		$("#buttons-view").empty();

		for (var i = 0; i < gifs.length; i++) {
			var b = $("<button>");
			b.addClass("cat");
			b.attr("data-category", gifs[i]);
			b.text(gifs[i]);
			$("#buttons-view").append(b);
		}
	}

	function displayGifs() {
		var category = $(this).attr("data-category");

		// Example queryURL for Giphy API
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=TUu2q2GxPfNGgXmLij3pBQ2SBAoMImOk&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);

			for(i = 0; i < response.data.length; i++) {

				var rating = response.data[i].rating;
				var still = response.data[i].images.fixed_height_still;
				var animate = response.data[i].images.fixed_height;


				// console.log(response.data[0].images.fixed_height.url)
			}
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
	$(document).on("click", ".cat", displayGifs);

	renderButtons();
});