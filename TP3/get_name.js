const axios = require('axios')

// axios.get(rota)
//     .then(f(response){})
//     .catch(f(error){})

// script em python que percorre todos os registos e acrescenta um campo "id"="p1", "id"="p2", etc

axios.get('http://localhost:3000/pessoas?CC=91258224-5-FV5')
    .then(function(response){
        var pessoas = response.data
        console.log(typeof(pessoas))
        console.log(pessoas[0].nome)
        //for (var i = 0; i < pessoas.length; i++) {
        //    if(pessoas[i].CC=="91258224-5-FV5")
        //        console.log(pessoas[i].nome)
        //} 
    })
    .catch( error => {
        console.log("Erro: "+error)
    })