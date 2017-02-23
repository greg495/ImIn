/*app.use(express.bodyParser());

app.post('/api/contact-us', (req, res) => {
    // connect to your MySQL database and insert the data
    // var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'http://kennethwschmittcom.ipagemysql.com',
        user     : 'sdd',
        password : 'sddimin',
        database : 'sdd'
    });

    connection.connect();

    connection.query('show tables', function(err, results, fields) {
    if (!err)
        console.log('The tables are: ', results);
    else
        console.log('Error while performing Query.');
    });

    connection.end();
});*/

var sys = require("sys"),
    http = require("http");
     
http.createServer(function(request, response) {
    console.log("\nstarting server...")
    var mysql      = require('mysql'); 
    var connection = mysql.createConnection({
        host     : 'sql9.freemysqlhosting.net',
        user     : 'sql9160186',
        password : 'JJkkGAHcka',
        database : 'sql9160186'
    });
    response.writeHead(200, {"Content-Type": "text/html"});

    connection.connect(function(err) {
        if (err) {
            console.log("could not connect to database");
            return;
        } else {
            console.log("connected to database");
        }
    });
    var query = 'CREATE TABLE IF NOT EXISTS users ' +
    '(name VARCHAR(256), ' +
    'age INT(3), ' +
    'sex CHAR(1)) '
    var query2 = 'INSERT INTO `users` VALUES ("John", 20, "M")'
    var query3 = 'SELECT * FROM `users`'

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
        response.end(results.toString());
    } else
        console.log('Error while performing Query.');
    });

    connection.end();
    // response.end();
}).listen(8009);
 
sys.puts("Server running at http://localhost:8009/");


// express version of app
/*var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'mypassword',
        server: 'localhost', 
        database: 'SchoolDB' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Student', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});*/