//old database information
/*host     : 'http://kennethwschmittcom.ipagemysql.com',
user     : 'sdd',
password : 'sddimin',
database : 'sdd'*/

// express version of app
var local_port = 8009;
var express = require('express');
var app = express();
var mysql = require("mysql");
var config = {
    host     : 'db4free.net',
    user     : 'sddimin',
    password : 'sddimin',
    database : 'imin' 
};
var createTableQuery = 'CREATE TABLE IF NOT EXISTS users ' +
            '(id VARCHAR(256), ' +
            'fullName VARCHAR(256), ' +
            'firstName VARCHAR(256)) ';
var query2 = 'INSERT INTO `users` VALUES ("1234", "John Smith, "John")';
var query3 = 'SELECT * FROM `users`';

app.get('/api/connect', function (req, response) {
    var couldNotConnect = false;
    // set up connection
    var connection = mysql.createConnection(config);
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

});

var server = app.listen(local_port, function () {
    console.log('Server is running on ' + local_port);
});