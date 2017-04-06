/* Function to add current user to game, gameID */
function imin(gameID){
	// Get the user ID and name
	FB.api('/me', {fields: 'name,first_name'}, function(response) {
		// Add user to the game in the database
		$.post("/api/imin", {
			gameID: gameID,
			userID: response.id,
			name: response.name
		}, function(data){});

		// Reload form
		showGameDetails(gameID);
	});
}

/* Function to remove current user from game, gameID */
function leaveGame(gameID){
	// Get the user ID and name
	FB.api('/me', {fields: 'name,first_name'}, function(response) {
		// Remove user from the game in the database
		$.post("/api/leaveGame", {
			gameID: gameID,
			userID: response.id,
			name: response.name
		}, function(data){});

		// Reload form
		showGameDetails(gameID);
	});
}