exports.pessoasPage = function(lista){
    var paginaHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css">
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Lista de Individuos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
                `
    
    for (let i = 0; i < lista.length; i++){
        paginaHTML+=`
                        <tr onclick="window.location.href='/individuo/${lista[i].id.substring(1)}';">
                            <td>${lista[i].id}</td>
                            <td>${lista[i].nome}</td>
                            <td>${lista[i].idade}</td>
                            <td>${lista[i].sexo}</td>
                            <td>${lista[i].morada.cidade}</td>
                        </tr>
                    </a>
        `
    }
                
    paginaHTML+=`
                    </table>
                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return paginaHTML
}

exports.pessoa=function(p){
    var paginaHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css">
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>${p.nome}</h1>
                </header>

                <div class="w3-container">
                    <h2><b>Idade:</b> ${p.idade}</h2> 
                    <h2><b>Sexo:</b> ${p.sexo}</h2>
                    <table>
                        <tr>
                            <td width="30%" valign="top">
                                <h2><b>Morada</b></h2>
                                <a name="morada"/>
                                <!-- Lista com o índice -->
                                <ul>
                                    <li>
                                        <h3><b>Distrito: </b>${p.morada.distrito}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Cidade: </b>${p.morada.cidade}</h3> 
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </table>
                    <h2><b>Profissao:</b> ${p.profissao}</h2>
                    <h2><b>Partido Politico:</b> ${p.partido_politico.party_name}</h2>
                    <h2><b>Religiao:</b> ${p.religiao}</h2>`
    paginaHTML+=lista("Desportos", p.desportos)
    paginaHTML+=lista("Animais", p.animais)
    paginaHTML+=lista("Figura publica", p.figura_publica_pt)
    paginaHTML+=`
                    <h2><b>Carro:</b> ${p.marca_carro}</h2> `
    paginaHTML+=lista("Destinos favoritos", p.destinos_favoritos)
    paginaHTML+=`
                    <table>
                        <tr>
                            <td width="30%" valign="top">
                                <h2><b>Atributos</b></h2>
                                <a name="atributos"/>
                                <!-- Lista com o índice -->
                                <ul>
                                    <li>
                                        <h3><b>Fumador: </b>${p.atributos.fumador? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Gosta de cinema: </b>${p.atributos.gosta_cinema? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Gosta de viajar: </b>${p.atributos.gosta_viajar? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Acorda cedo: </b>${p.atributos.acorda_cedo? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Gosta de ler: </b>${p.atributos.gosta_ler? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Gosta de música: </b>${p.atributos.gosta_musica? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Gosta de comer: </b>${p.atributos.gosta_comer? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Gosta de animais de estimação: </b>${p.atributos.gosta_animais_estimacao? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Gosta de dançar: </b>${p.atributos.gosta_dancar? "Sim" : "Não"}</h3> 
                                    </li>
                                    <li>
                                        <h3><b>Comida favorita: </b>${p.atributos.comida_favorita}</h3> 
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </table>
                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return paginaHTML
}

exports.listas=function(name,ts){
    var paginaHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css">
            <title>${firstToUpper(name)}...</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>${firstToUpper(name)}</h1>
                </header>

                <div class="w3-container">
                    <table>
                        <tr>
                            <td width="30%" valign="top">
                                <a name="${name}"/>
                                <!-- Lista com o índice -->
                                <ul>`
    for (let i = 0; i < ts.length; i++){
        paginaHTML+=`
                                    <li>
                                        <a href="http://localhost:7777/${name}/${ts[i].atr}">
                                            <h3>${firstToUpper(ts[i].atr)} : ${ts[i].count}</h3> 
                                        </a>
                                    </li>
        `
    }
    paginaHTML+=`
                                </ul>
                            </td>
                        </tr>
                    </table>
                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return paginaHTML
}

function lista(titulo,lista){
    paginaHTML=`
                    <table>
                        <tr>
                            <td width="30%" valign="top">
                                <h2><b>${titulo}</b></h2>
                                <a name="${titulo}"/>
                                <!-- Lista com o índice -->
                                <ul>`
    for (let i = 0; i < lista.length; i++){
        paginaHTML+=`
                                    <li>
                                        <h3>${lista[i]}</h3> 
                                    </li>
        `
    }
    paginaHTML+=`
                                </ul>
                            </td>
                        </tr>
                    </table>`

    return paginaHTML
    
}

exports.index=function(){
    var paginaHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css">
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Página Inicial</h1>
                </header>

                <div class="w3-container">
                    <a href="http://localhost:7777/lista">
                        <h2>Lista de Individuos</h2>
                    </a><br>
                    <a href="http://localhost:7777/sexo">
                        <h2>Distribuição de individuos por sexo</h2>
                    </a><br>
                    <a href="http://localhost:7777/desportos">
                        <h2>Distribuição de individuos por desporto</h2>
                    </a><br>
                    <a href="http://localhost:7777/profissao">
                        <h2>Top 10 profissoes</h2>
                    </a><br>

                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return paginaHTML
}

function firstToUpper(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}