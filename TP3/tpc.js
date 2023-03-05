// tpc.js
// RPCW2023: 2023-03-03
// by yakari

// servico sobre o dataset de pessoas utiizado o json_server
// localhost:porta/
//     1. Link para lista de individuos(pagina nova)
//     2. Distribuicao de individuos por sexo( quantos sao de cada sexo e acesso a lista de cada sexo)
//     3. Distribuicao de individuos por desporto( quantos sao de cada desporto e acesso a lista de cada desporto)
//     4. Top 10 de profissoes( quantos sao de cada profissao e acesso a lista de cada profissao)

// instalar mongodb versao 4 ou 5

// extra na tabela de pessoas clicando na linha da pessoa vai para a pagina da pessoa

var http = require('http')
var url = require('url')
var axios = require('axios')
var pessoa = require('./pessoa.js')
var fs = require('fs')

http.createServer(function (req, res) {
    var dicURL = url.parse(req.url, true)
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + ' ' + req.url + " " + d)
    
    if (dicURL.pathname == "/"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(pessoa.index())
        res.end()
    }
    else if (dicURL.pathname.includes("/w3.css")){
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
    else if (dicURL.pathname == "/lista"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(pessoa.pessoasPage(pessoas))
                res.end()
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if(dicURL.pathname == "/sexo"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/pessoas').
            then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                var ls = []
                var cs = []
                var ts = []
                flag=true
                for (var i=0; i<pessoas.length; i++){
                    if(ls.includes(pessoas[i].sexo)){
                        var index = ls.indexOf(pessoas[i].sexo)
                        cs[index]++
                        ts[index].count++
                    }
                    else{
                        ls.push(pessoas[i].sexo)
                        cs.push(1)
                        ts.push({atr: pessoas[i].sexo, count: 1})
                    }
                }
                ts.sort(function(a, b) {
                    return b.count - a.count;
                })
                res.end(pessoa.listas("sexo",ts))
            }).
            catch(function (error) {
                console.log(error)
            })
    }
    else if (dicURL.pathname.includes("/sexo/")){
        var id = dicURL.pathname.split("/")[2]
        axios.get('http://localhost:3000/pessoas?sexo='+id)
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pessoa.pessoasPage(pessoas))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if (dicURL.pathname == "/desportos"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                var ls = []
                var cs = []
                var ts = []
                flag=true
                for (var i=0; i<pessoas.length; i++){
                    for(var j=0; j<pessoas[i].desportos.length; j++){
                        if(ls.includes(pessoas[i].desportos[j])){
                            var index = ls.indexOf(pessoas[i].desportos[j])
                            cs[index]++
                            ts[index].count++
                        }
                        else{
                            ls.push(pessoas[i].desportos[j])
                            cs.push(1)
                            ts.push({atr: pessoas[i].desportos[j], count: 1})
                        }
                    }
                }
                ts.sort(function(a, b) {
                    return b.count - a.count;
                })
                res.end(pessoa.listas("desportos",ts))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if (dicURL.pathname.includes("/desportos/")){
        var id = dicURL.pathname.split("/")[2]
        axios.get('http://localhost:3000/pessoas?q='+id)
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pessoa.pessoasPage(pessoas))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if(dicURL.pathname == "/profissao"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/pessoas').
            then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                var ls = []
                var cs = []
                var ts = []
                flag=true
                for (var i=0; i<pessoas.length; i++){
                    if(ls.includes(pessoas[i].profissao)){
                        var index = ls.indexOf(pessoas[i].profissao)
                        cs[index]++
                        ts[index].count++
                    }
                    else{
                        ls.push(pessoas[i].profissao)
                        cs.push(1)
                        ts.push({atr: pessoas[i].profissao, count: 1})
                    }
                }
                ts.sort(function(a, b) {
                    return b.count - a.count;
                })
                res.end(pessoa.listas("profissao",ts.slice(0,10)))
            }).
            catch(function (error) {
                console.log(error)
            })
    }
    else if (dicURL.pathname.includes("/profissao/")){
        var id = dicURL.pathname.split("/")[2]
        axios.get('http://localhost:3000/pessoas?profissao='+id)
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pessoa.pessoasPage(pessoas))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else if (dicURL.pathname.includes("/individuo/")){
        var id = dicURL.pathname.split("/")[2]
        axios.get('http://localhost:3000/pessoas/p'+id)
            .then(function (response) {
                var pessoas = response.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pessoa.pessoa(pessoas))
            })
            .catch(function (error) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO: "+error)
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("Erro: Operação não suportada!")
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...')