function displayGames() {
    $.getJSON('/api/getGames', {}, function(data) {
    	console.log( data );
    });
}