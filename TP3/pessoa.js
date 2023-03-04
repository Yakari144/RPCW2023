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
                        <tr>
                            <td>${lista[i].id}</td>
                            <td>${lista[i].nome}</td>
                            <td>${lista[i].idade}</td>
                            <td>${lista[i].sexo}</td>
                            <td>${lista[i].morada.cidade}</td>
                        </tr>
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

exports.desportos=function(ds,cs){
    var paginaHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css">
            <title>Desportos...</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Desportos</h1>
                </header>

                <div class="w3-container">
                    <table>
                        <tr>
                            <td width="30%" valign="top">
                                <a name="desportos"/>
                                <!-- Lista com o índice -->
                                <ul>`
    for (let i = 0; i < ds.length; i++){
        paginaHTML+=`
                                    <li>
                                        <h3>${ds[i]} : ${cs[i]}</h3> 
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