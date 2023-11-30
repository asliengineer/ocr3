var http = require('http');
var fs = require('fs');
 
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('D:/hello.txt', function (err, data) {
        //res.writeHead(200, { 'Content-Type': 'text/html' });
        console.log(data);
        res.write(data);
        return res.end();
    })
}).listen(8080);