var http = require('http');
var url = require('url');

var myserver = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var txt ="";
    var q2 = url.parse(req.url, true);
    var q = url.parse(req.url, true).query;
    if(q2.pathname == '/add'){
        var r = parseInt(q.a,10) + parseInt(q.b,10);
        var txt = q.a + " + " + q.b + " = " + r;
    }
    else if(q2.pathname == '/sub'){
        var r = parseInt(q.a,10) - parseInt(q.b,10);
        var txt = q.a + " - " + q.b + " = " + r;
    }
    res.end(txt);
})

myserver.listen(7777);

console.log('Servidor à escuta na porta 7777...');
