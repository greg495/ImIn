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
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9160186',
    password : 'JJkkGAHcka',
    database : 'sql9160186' 
};
var query = 'CREATE TABLE IF NOT EXISTS users ' +
            '(name VARCHAR(256), ' +
            'age INT(3), ' +
            'sex CHAR(1)) ';
var query2 = 'INSERT INTO `users` VALUES ("John", 20, "M")';
var query3 = 'SELECT * FROM `users`';

app.get('/api/connect', function (req, response) {
    // set up connection
    var connection = mysql.createConnection(config);
    // connect to database
    connection.connect(function(err) {
        if (err) {
            console.log("could not connect to database");
            return;
        } else {
            console.log("connected to database");
        }
    });
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

var server = app.listen(local_port, function () {
    console.log('Server is running on ' + local_port);
});