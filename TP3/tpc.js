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
    else if(dicURL.pathname == "/sexo"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/pessoas?sexo=feminino').
            then(function (response) {
                fem = response.data.length
                res.write('Feminino: '+fem+'<br>')
            }).
            catch(function (error) {
                console.log(error)
            })
        axios.get('http://localhost:3000/pessoas?sexo=masculino').
            then(function (response) {
                masc = response.data.length
                res.write('Masculino: '+masc+'<br>')
            }).
            catch(function (error) {
                console.log(error)
            })
        axios.get('http://localhost:3000/pessoas?sexo=outro').
            then(function (response) {
                outro = response.data.length
                res.end('Outro: '+outro+'<br>')
            }).
            catch(function (error) {
                console.log(error)
            })
    }
    else if (dicURL.pathname == "/sexo/masculino"){
        axios.get('http://localhost:3000/pessoas?sexo=masculino')
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
    else if (dicURL.pathname == "/sexo/feminino"){
        axios.get('http://localhost:3000/pessoas?sexo=feminino')
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
    else if (dicURL.pathname == "/sexo/outro"){
        axios.get('http://localhost:3000/pessoas?sexo=outro')
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
                flag=true
                for (var i=0; i<pessoas.length; i++){
                    for(var j=0; j<pessoas[i].desportos.length; j++){
                        if(ls.includes(pessoas[i].desportos[j])){
                            var index = ls.indexOf(pessoas[i].desportos[j])
                            cs[index]++
                        }
                        else{
                            ls.push(pessoas[i].desportos[j])
                            cs.push(1)
                        }
                    }
                }
                res.end(pessoa.desportos(ls, cs))
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
    else if (dicURL.pathname == "/ordenada2"){
        axios.get('http://localhost:3000/pessoas')
            .then(function (response) {
                var pessoas = response.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1,p2) => (p1.nome<p2.nome) ? -1 : 1
                )

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pessoa.pessoasPage(pessoasOrdenadas))
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