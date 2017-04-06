/* Function to show game detail for selected game */
function showGameDetails(gameID) {
	// Clear the div
	document.getElementById("detailContainer").innerHTML = "";

	// return if marker is being added
	if ( gameID == 'Marker' ) {
		return;
	}

	// Get game details from database
	$.getJSON('/api/getGameDetails', 
    {
      ID: gameID
    },function(data) {

		// Get the game detail container
		var detailContainer = document.getElementById('detailContainer');
		var linebreak = document.createElement('BR');

		// Make a label for the sport
		var sportLabel = document.createTextNode('Sport: ' + data[0].sport);
		detailContainer.appendChild(sportLabel);
		detailContainer.appendChild(linebreak);

		// Make a label for the creator
		var creatorLabel = document.createTextNode('Creator: ' + data[0].creator);
		detailContainer.appendChild(creatorLabel);

		// Make img for creator
		var creatorImage = document.createElement("img");
		creatorImage.setAttribute('src', 'https://graph.facebook.com/'+data[0].creatorID+'/picture')
		//detailContainer.appendChild(creatorImage);
		linebreak = document.createElement('BR');
		detailContainer.appendChild(linebreak);

		// Make a label for the time
		var timeLabel = document.createTextNode('time: ' );
		detailContainer.appendChild(timeLabel);
		linebreak = document.createElement('BR');
		detailContainer.appendChild(linebreak);

		// Make a label for the description
		var description = document.createTextNode('description: ' + data[0].description);
		detailContainer.appendChild(description);
		linebreak = document.createElement('BR');
		detailContainer.appendChild(linebreak);
		linebreak = document.createElement('BR');
		detailContainer.appendChild(linebreak);

		// Add the button and player list
		addButton(gameID);
	});
}
