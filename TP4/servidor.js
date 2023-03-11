// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Server creation
// Aux function to process body

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var todoServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == "/"){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the tasks's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.index(tasks))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                            res.end()
                        })
                }
                break
            case "POST":
                if(req.url == '/'){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    collectRequestBodyData(req, result => {
                        if(result){
                            result.doneAt=""
                            axios.post("http://localhost:3000/tasks",result)
                            .then(response => {
                                res.writeHead(302, {'Location': '/'});
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                
                else if(req.url == '/delete'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.delete("http://localhost:3000/tasks/"+result.id)
                            .then(response => {
                                res.writeHead(302, {'Location': '/'});
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(req.url == '/done'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.patch(`http://localhost:3000/tasks/${result.id}`, {
                                "doneAt": result.date,
                            })
                            .then(resp => {
                                res.writeHead(302, {'Location': '/'});
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(req.url == '/undone'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.patch(`http://localhost:3000/tasks/${result.id}`, {
                                "doneAt": "",
                            })
                            .then(resp => {
                                res.writeHead(302, {'Location': '/'});
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }/*
                else if(req.url == '/edit'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post(`http://localhost:3000/tasks/`,result)
                            .then(resp => {
                                res.writeHead(302, {'Location': '/'});
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                                res.end()
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }*/
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

todoServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



