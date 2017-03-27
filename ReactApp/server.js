//old database information
/*host     : 'http://kennethwschmittcom.ipagemysql.com',
user     : 'sdd',
password : 'sddimin',
database : 'sdd'*/

// express version of app
var local_port = 8009;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require("mysql");
var config = {
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9165711',
    password : 'WACXWm7CRM',
    database : 'sql9165711' 
};

var connection = mysql.createConnection(config);

// this helps with parsing the data sent from forms
app.use(bodyParser.json());

app.get('/api/addUser', function (req, response) {
    // Set up connection
    var couldNotConnect = false;
    var connection = mysql.createConnection(config);
    
    // Connect to database
    connection.connect(function(err) {
        if (err) {
            console.log("could not connect to database");
            couldNotConnect = true;
        } else {
            console.log("connected to database");
        }
    });

    // Handle if connection failed
    if (couldNotConnect) {
        console.log("got into special bracket");
        response.end("could not connect to db");
        return;
    }

    // Make sure user table exists
    var createTableQuery = 'CREATE TABLE IF NOT EXISTS users ' +
            '(id VARCHAR(256), ' +
            'fullName VARCHAR(256), ' +
            'firstName VARCHAR(256)) ';
    connection.query(createTableQuery, function(err, results, fields) {
    if (!err) {
    } else
        console.log('Error while making table.');
    });

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

    // Close connection
    connection.end();
});

app.post("/api/form", function(req, response) {
    connection.connect(function(err) {
        if (err) {
            console.log("could not connect to database");
        } else {
            console.log("connected to database");
        }
    });
    var gameTableCreation = `CREATE TABLE IF NOT EXISTS games
                    (name VARCHAR(127),
                     description TEXT,
                     sport VARCHAR(127) NOT NULL,
                     latitude FLOAT(10,10) NOT NULL,
                     longitude FLOAT(10,10) NOT NULL,
                     creatorID BIGINT(20) NOT NULL,
                     gameID BIGINT NOT NULL AUTO_INCREMENT,
                     PRIMARY KEY(gameID) )`;
    var gameInsertion = `INSERT INTO games VALUES (${req.body.eventName}, ${req.body.description}, ${req.body.sport}, ${req.body.latitude}, ${req.body.longitude}, ${req.body.creatorID})`;

    // Close connection
    connection.end();
});

app.get('/api/getGames', function (req, response) {
    // Set up connection
    var couldNotConnect = false;
    var connection = mysql.createConnection(config);
    
    // Connect to database
    connection.connect(function(err) {
        if (err) {
            console.log("could not connect to database");
            couldNotConnect = true;
        } else {
            console.log("connected to database");
        }
    });

    // Handle if connection failed
    if (couldNotConnect) {
        console.log("got into special bracket");
        response.end("could not connect to db");
        return;
    }
    
    // Get all the games
    var getGamesQuery = 'SELECT * FROM `games`';
    connection.query(getGamesQuery, function(err, results, fields) {
        if (!err) {
            response.send( JSON.stringify(results) );
            console.log("Sent game information.")
        } else {
            console.log('Error searching database.');
        }
    });
    
    // Close connection
    connection.end();
});

var server = app.listen(local_port, function () {
    console.log('Server is running on ' + local_port);
});