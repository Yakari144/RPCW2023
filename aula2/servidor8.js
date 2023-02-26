var http = require('http')
var fs = require('fs')

function removeBarra(txt){
    if(txt[0] == "/")
        return txt.substring(1)
    else
        return txt
}

http.createServer(function (req, res) {
   var d = new Date().toISOString().substring(0, 16)
   console.log(req.method + " " + req.url + " " + d)
   file=removeBarra(req.url)
   if(file.includes('.html')){
      console.log(">"+file+"<")
      fs.readFile(file, function(err, data) {
         res.writeHead(200, {'Content-Type': 'text/html'})
         if(err)
            res.write("Erro: " + err)
         else
            res.write(data)
         res.end()
      })
   }
}).listen(7777)


console.log('Servidor Ã  escuta na porta 7777...')