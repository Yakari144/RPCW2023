// pessoas_server.js
// RPCW2023: 2023-01-27
// by yakari

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages.js')
var fs = require('fs')

http.createServer(function (req, res) {
    var dicURL = url.parse(req.url, true)
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + ' ' + req.url + " " + d)
    if (dicURL.pathname == "/"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if (dicURL.pathname == "/ordenada"){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if (dicURL.pathname == "/ordenada2"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (response) {
                var pessoas = response.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1,p2) => (p1.nome<p2.nome) ? -1 : 1
                )

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoasOrdenadas))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if (dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                res.write("Erro: " + err)
                console.log("Erro na leitura da stylesheet")
            }else
                res.write(data)
            res.end()
        })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("Erro: Operação não suportada!")
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...')