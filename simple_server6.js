var http = require('http'); // Import Node.js core module
var mysql = require('mysql'); // import mysql
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
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
        res.write('<html>' +
            '<script src="Scripts/client.js"></script>' +
            '<body>' +
            '<p>This is admin Page.' +
            '</p>' +
            '<input>' +
            '<br>' +
            '<button id="myButton">Add user to admins!</button>' +
            '</body>' +
            '</html>');

        res.end();
    
    }
    else if (req.url == "/Scripts/client.js") {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        script = fs.readFileSync("Scripts/client.js", "utf8");
        res.write(script);
        res.end();
    }
    else
        res.end('Invalid Request!');

});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')