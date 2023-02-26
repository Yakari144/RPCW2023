var http = require('http');
var meta = require('./aux.js');

var myserver = http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16);
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(req.method + " " + req.url + " " + d)
    res.write('<pre>' + req.method + " " + req.url + " " + d + '</pre>');
    res.end();
})

myserver.listen(7777);

console.log('Servidor à escuta na porta 7777...');


