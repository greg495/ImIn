function displayGames() {
	console.log("HERE");
    $.getJSON('/api/getGames', {}, function(data) {
    	console.log( data );
    });
}