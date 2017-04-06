var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require("mysql");

var local_port = 8009;
var config = {
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9165711',
    password : 'WACXWm7CRM',
    database : 'sql9165711' 
};
var connection = mysql.createConnection(config);
connection.connect(function(err) {
    if (err) {
        console.log("could not connect to database");
        couldNotConnect = true;
    } else {
        console.log("connected to database");
    }
});

// this helps with parsing the data sent from forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/addUser', function (req, response) {
    // Make sure user table exists
    var createTableQuery = 'CREATE TABLE IF NOT EXISTS users ' +
            '(id VARCHAR(256), ' +
            'fullName VARCHAR(256), ' +
            'firstName VARCHAR(256)) ';
    connection.query(createTableQuery, function(err, results, fields) {
        if (!err) {
        } else
            console.log('Error while making table.');
        }
    );

    // See if ID is in database
    var findIdQuery = 'SELECT * FROM `users` WHERE id="'+req.query.id+'"';
    connection.query(findIdQuery, function(err, results, fields) {
    if (!err) {
        if ( results.length == 0 ) {

            // Add new user to the database
            var addUserQuery = 'INSERT INTO `users`(`id`, `fullName`, `firstName`) VALUES ("' + req.query.id + '", "' + req.query.fullName + '", "' + req.query.firstName + '")';
            connection.query(addUserQuery, function(err2, results2, fields2) {
                if (!err2) {
                    console.log('User: ' + req.query.fullName + ' added to Database!');
                } else {
                    console.log('Error adding user!');
                }
            });

        } else {
            console.log("User already in database.");
        }
    } else
        console.log('Error searching database.');
    });

    response.end();
});

app.post("/api/form", function(req, response) {
    var gameTableCreation = `CREATE TABLE IF NOT EXISTS games
                    (name VARCHAR(127),
                     description TEXT,
                     sport VARCHAR(127) NOT NULL,
                     latitude VARCHAR(127) NOT NULL,
                     longitude VARCHAR(127) NOT NULL,
                     creatorID BIGINT(20) NOT NULL,
                     gameID BIGINT NOT NULL AUTO_INCREMENT,
                     PRIMARY KEY(gameID) )`;
    var gameInsertion = `INSERT INTO games (name, description, sport, latitude, longitude, creatorID) VALUES ('${req.body.eventName}', '${req.body.description}', '${req.body.sport}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.creatorID}')`;

    connection.query(gameTableCreation, function(err, results, fields) {
        if (!err) {
            console.log("table was either made fine or already created");
        } else
            console.log('Error while making table.');
        }
    );
    connection.query(gameInsertion, function(err, results, fields) {
        if (!err) {
            console.log("made query successfully");
        } else
            console.log('Error while performing game adding query.');
        }
    );

    response.send({ redirect: "http://localhost:8008"});
});

app.get('/api/getGames', function (req, response) {    
    // Get all the games
    var getGamesQuery = 'SELECT * FROM `games`';
/* Function to remove a user from a specific game */
app.post("/api/leaveGame", function(req, response) {
    // Create the query
    var removal = 'DELETE FROM `attending` WHERE gameID="'+req.body.gameID+'" AND userID="'+req.body.userID+'"';
    
    // Run the query
    connection.query(removal, function(err, results, fields) {
        if (!err) {
            console.log("User was successfuly removed from game.");
        } else {
            console.log('Error while removing player from game.');
        }
    });
});

/* Function to get all users attending a game */
app.get('/api/getUsersAttending', function (req, response) {    
    // Create query
    var getGamesQuery = 'SELECT * FROM `attending` WHERE gameID="'+req.query.ID+'"';
    
    // Run query
    connection.query(getGamesQuery, function(err, results, fields) {
        if (!err) {
            response.send( JSON.stringify(results) );
            console.log('Sent list of users attending game.')
        } else {
            console.log('Error searching database.');
        }
    });
});
    connection.query(getGamesQuery, function(err, results, fields) {
        if (!err) {
            response.send( JSON.stringify(results) );
            console.log("Sent game information.")
        } else {
            console.log('Error searching database.');
        }
    });
});

var server = app.listen(local_port, function () {
    console.log('Server is running on ' + local_port);
});