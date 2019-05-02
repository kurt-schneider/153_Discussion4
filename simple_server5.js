var http = require('http'); // Import Node.js core module
var mysql = require('mysql'); // import mysql

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "discussion"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request

        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // set response content
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();

    }
    else if (req.url == "/student") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        con.query("select * from student;", function(err, result) {
            if(err) throw err;
            res.write("<html><body><p>Here are a list of all our students:<br>");
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                res.write(row.name);
                res.write("<br>");
            });
            res.write("</p></body>");
            res.end();
        });

    }
    else if (req.url == "/admin") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.write('<input>')
        res.end();
    
    }
    else
        res.end('Invalid Request!');

});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')