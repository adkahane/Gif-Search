$( document ).ready(function() {

	// Global Variables

	var gifs = ["skateboarding", "hair metal", "mma", "overwatch", "gaming"];


	// FUNCTIONS

	// Renders buttons from gifs array
	function renderButtons() {
		$("#buttons-view").empty();

		for (var i = 0; i < gifs.length; i++) {
			var b = $("<button class='btn btn-info mx-1'>");
			b.addClass("cat");
			b.attr("data-category", gifs[i]);
			b.text(gifs[i]);
			$("#buttons-view").append(b);
			$("#gif-input").val('');
		}
	}

	// Displays Gifs in their 'still' state and gives them defined values.
	function displayGifs() {
		$("#gif-view").empty();

		var category = $(this).attr("data-category");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=TUu2q2GxPfNGgXmLij3pBQ2SBAoMImOk&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			for(i = 0; i < response.data.length; i++) {
				var rating = response.data[i].rating;
				var still = response.data[i].images.fixed_height_still.url
				var animate = response.data[i].images.fixed_height.url;
				var newGif = $("<img>");
				newGif.addClass("gif");
				newGif.attr("src", still);
				newGif.attr("data-state", "still");
				newGif.attr("data-still", still);
				newGif.attr("data-animate", animate);
				$("#gif-view").append(newGif);
			}
		});
	}

	// Switches still images to GIFs and visa versa when clicked.
	function switchState() {
		if ($(this).attr("data-state") === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}
		else if ($(this).attr("data-state") === "animate") {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	}

	// Adds category button from user input form
	$("#add-gif").on("click", function(event) {
		event.preventDefault();
		var category = $("#gif-input").val().trim();
		if (category !== "" && gifs.indexOf(category) === -1) {
			gifs.push(category);
			renderButtons();
		}
	});

	// Call displayGifs function when buttons are clicked
	$(document).on("click", ".cat", displayGifs);
	$(document).on("click", ".gif", switchState);

	renderButtons();
});