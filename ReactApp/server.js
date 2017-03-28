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
var createTableQuery = 'CREATE TABLE IF NOT EXISTS users ' +
            '(id VARCHAR(256), ' +
            'fullName VARCHAR(256), ' +
            'firstName VARCHAR(256)) ';
var query2 = 'INSERT INTO `users` VALUES ("1234", "John Smith, "John")';
var query3 = 'SELECT * FROM `users`';
var connection = mysql.createConnection(config);

// this helps with parsing the data sent from forms
app.use(bodyParser.json());

app.get('/api/connect', function (req, response) {
    var couldNotConnect = false;
    // connect to database
    connection.connect(function(err) {
        if (err) {
            console.log("could not connect to database");
            couldNotConnect = true;
        } else {
            console.log("connected to database");
        }
    });
    if (couldNotConnect) {
        console.log("got into special bracket");
        response.end("could not connect to db");
        connection.end();
        return;
    }
    // perform queries
    connection.query('SHOW TABLES', function(err, results, fields) {
    if (!err) {
        console.log('The tables are: ');
        console.log(results);
    } else
        console.log('Error while showing tables.');
    });
    connection.query(createTableQuery, function(err, results, fields) {
    if (!err) {
        console.log('created table: ');
        console.log(results);
    } else
        console.log('Error while making table.');
    });
    connection.query(query2, function(err, results, fields) {
    if (!err) {
        console.log('inserted user: ');
        console.log(results);
    } else
        console.log('Error while inserting.');
    });
    connection.query(query3, function(err, results, fields) {
    if (!err) {
        console.log('The users are: ');
        console.log(results);
        response.end(JSON.stringify(results));
    } else
        console.log('Error while performing Query.');
    });
    // close connection
    connection.end();
});

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
            } else
                console.log('Error adding user!');
            });

        } else {
            console.log("User already in database.");
        }
    } else
        console.log('Error searching database.');
    });

    // close connection
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
                     latitude FLOAT(6,10) NOT NULL,
                     longitude FLOAT(6,10) NOT NULL,
                     creatorID BIGINT(20) NOT NULL,
                     gameID BIGINT NOT NULL AUTO_INCREMENT)`;
    var gameInsertion = `INSERT INTO games VALUES (${req.body.eventName}, ${req.body.description}, ${req.body.sport}, ${req.body.latitude}, ${req.body.longitude}, ${req.body.creatorID})`;

    // close connection
    connection.end();
});

var server = app.listen(local_port, function () {
    console.log('Server is running on ' + local_port);
});