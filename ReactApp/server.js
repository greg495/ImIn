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
var query = 'CREATE TABLE IF NOT EXISTS users ' +
            '(name VARCHAR(256), ' +
            'age INT(3), ' +
            'sex CHAR(1)) ';
var query2 = 'INSERT INTO `users` VALUES ("John", 20, "M")';
var query3 = 'SELECT * FROM `users`';
var connection = mysql.createConnection(config);

// this helps with parsing the data sent from forms
app.use(express.bodyParser());

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
    connection.query(query, function(err, results, fields) {
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
});

var server = app.listen(local_port, function () {
    console.log('Server is running on ' + local_port);
});