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

/* Function to display button on the game detail form */
function addButton(gameID) {
	// Get user info
	FB.api('/me', {fields: 'name,first_name'}, function(response) {
		$.getJSON('/api/getUserInGame', 
	    {
	      gameID: gameID,
	      userID: response.id
	    },function(data) {
	    	// Make the im in button
			var button = document.createElement("button");
	    	
	    	// See if the user is already in the game
	    	if ( data.length == 0 ) {
	    		button.innerHTML = "I'm In!";
				button.addEventListener('click', function(){ imin(gameID); });
	    	}else{
	    		button.innerHTML = "Leave Game";
				button.addEventListener('click', function(){ leaveGame(gameID); });
	    	}

	    	// Add the button to the page
	    	detailContainer.appendChild(button);

	    	// Add the list of palyers
	    	addPlayerList(gameID);
	    });
	});
}

/* Function to display a list of players attending the game */
function addPlayerList(gameID) {
	$.getJSON('/api/getUsersAttending', 
    {
      ID: gameID
    },function(data) {
    	// Make a table of users
    	var userTable = document.createElement("table");
    	var firstRow = userTable.insertRow(0);
    	firstRow.innerHTML = "Players:";

    	// Add a row for every user
    	data.forEach(function(element) {
    		var row = userTable.insertRow(-1);
    		var cell1 = row.insertCell(0);
    		var cell2 = row.insertCell(1);
    		cell2.innerHTML = element.name;
    		var img = document.createElement('img');
    		img.src = 'https://graph.facebook.com/'+element.userID+'/picture';
    		cell1.appendChild(img);
    	});

    	// Add the table to the game detail form
    	detailContainer.appendChild(userTable);
    });
}