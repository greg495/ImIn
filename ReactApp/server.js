// Set up server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require("mysql");

// Set connection details
var local_port = 8009;
var config = {
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9165711',
    password : 'WACXWm7CRM',
    database : 'sql9165711' 
};

// Connect to database
var connection = mysql.createConnection(config);
connection.connect(function(err) {
    if (err) {
        console.log("could not connect to database");
        couldNotConnect = true;
    } else {
        console.log("connected to database");
    }
});

// This helps with parsing the data sent from forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* Function to add a new user to the database */
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

    // See if ID is already in database
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

/* Function to add a new game to the database */
app.post("/api/form", function(req, response) {
    // Create the database queries
    var gameTableCreation = `CREATE TABLE IF NOT EXISTS games
                    (time VARCHAR(127),
                     date VARCHAR(127),
                     description TEXT,
                     sport VARCHAR(127) NOT NULL,
                     latitude VARCHAR(127) NOT NULL,
                     longitude VARCHAR(127) NOT NULL,
                     creatorID VARCHAR(127) NOT NULL,
                     creatorName VARCHAR(127),
                     gameID BIGINT NOT NULL AUTO_INCREMENT,
                     PRIMARY KEY(gameID) )`;
    var gameInsertion = `INSERT INTO games (time, date, description, sport, latitude, longitude, creatorID, creatorName) VALUES ('${req.body.time}', '${req.body.date}', '${req.body.description}', '${req.body.sport}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.creatorID}', '${req.body.creatorName}')`;

    // Create the table, if needed
    connection.query(gameTableCreation, function(err, results, fields) {
        if (!err) {
            console.log("Table was either made fine or already created");
        } else
            console.log('Error while making table.');
        }
    );

    // Add the game to the table
    connection.query(gameInsertion, function(err, results, fields) {
        if (!err) {
            console.log("Game successfully added");
            response.send({ redirect: "http://localhost:8008", gameID: results['insertId']});
        } else
            console.log('Error while performing game adding query.');
        }
    );
});

/* Function to get a list of all games in the database */
app.get('/api/getGames', function (req, response) {    
    // Create the query
    var getGamesQuery = 'SELECT * FROM `games`';

    // Run the query
    connection.query(getGamesQuery, function(err, results, fields) {
        if (!err) {
            response.send( JSON.stringify(results) );
            console.log('Sent list of all games.')
        } else {
            console.log('Error searching database.');
        }
    });
});

/* Function to get the details for a specific game */
app.get('/api/getGameDetails', function (req, response) {    
    // Create the query
    var getGamesQuery = 'SELECT * FROM `games` WHERE gameID="'+req.query.ID+'"';

    // Run the query
    connection.query(getGamesQuery, function(err, results, fields) {
        if (!err) {
            response.send( JSON.stringify(results) );
            console.log('Sent game details.')
        } else {
            console.log('Error searching database.');
        }
    });
});

/* Function to add user to a specific game */
app.post("/api/imin", function(req, response) {
    // Create the queries
    var tableCreation = `CREATE TABLE IF NOT EXISTS attending
                (gameID BIGINT(20) NOT NULL,
                 userID VARCHAR(127) NOT NULL,
                 name VARCHAR(127) NOT NULL )`;
    var insertion = `INSERT INTO attending (gameID, userID, name) VALUES ('${req.body.gameID}', '${req.body.userID}', '${req.body.name}' )`;

    // Make the table if needed
    connection.query(tableCreation, function(err, results, fields) {
        if (!err) {
            console.log('Table was either made fine or already created.');
        } else {
            console.log('Error while making table.');
        }
    });

    // Add user to the game
    connection.query(insertion, function(err, results, fields) {
        if (!err) {
            console.log('User is attending game.');
        } else {
            console.log('Error while performing user attending game query.');
        }
    });
});

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

/* Function to see if a user is attending a specific game */
app.get('/api/getUserInGame', function (req, response) {    
    // Create the query
    var getGamesQuery = 'SELECT * FROM `attending` WHERE gameID="'+req.query.gameID+'" AND userID="'+req.query.userID+'"';
    
    // Run the query
    connection.query(getGamesQuery, function(err, results, fields) {
        if (!err) {
            response.send( JSON.stringify(results) );
            console.log("Sent response.")
        } else {
            console.log('Error searching database.');
        }
    });
});

/* Function to get all messages for a specific game */
app.get('/api/getGameMessages', function (req, response) {    
    // Create query
    var getGamesQuery = 'SELECT * FROM `messages` WHERE gameID="'+req.query.ID+'"';
    
    // Run query
    connection.query(getGamesQuery, function(err, results, fields) {
        if (!err) {
            response.send( JSON.stringify(results) );
            console.log('Sent list of messages for game.')
        } else {
            console.log('Error searching database.');
        }
    });
});

/* Function to add message for a specific game */
app.post("/api/addMessage", function(req, response) {
    // Create the queries
    var tableCreation = `CREATE TABLE IF NOT EXISTS messages
                (gameID BIGINT(20) NOT NULL,
                 userID VARCHAR(127) NOT NULL,
                 firstName VARCHAR(127) NOT NULL,
                 fullName VARCHAR(127) NOT NULL,
                 message TEXT NOT NULL,
                 date VARCHAR(127) NOT NULL,
                 time VARCHAR(127) NOT NULL,
                 messageID BIGINT NOT NULL AUTO_INCREMENT,
                 PRIMARY KEY(messageID) )`;
    var insertion = `INSERT INTO messages (gameID, userID, firstName, fullName, message, date, time ) VALUES ('${req.body.gameID}', '${req.body.userID}', '${req.body.firstName}', '${req.body.fullName}', '${req.body.msg}', '${req.body.date}', '${req.body.time}' )`;

    // Make the table if needed
    connection.query(tableCreation, function(err, results, fields) {
        if (!err) {
            console.log('Table was either made fine or already created.');
        } else {
            console.log('Error while making table.');
        }
    });

    // Add user to the game
    connection.query(insertion, function(err, results, fields) {
        if (!err) {
            console.log('Message added to database');
        } else {
            console.log('Error while performing add message query.');
        }
    });
});

var server = app.listen(local_port, function () {
    console.log('Server is running on ' + local_port);
});