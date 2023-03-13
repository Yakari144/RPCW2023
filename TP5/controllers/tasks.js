var axios = require('axios')


module.exports.list = function(){
    return axios.get('http://localhost:3000/tasks?_sort=date')
            .then(res =>{
                return res.data
            })
            .catch(erro =>{
                return erro
            })
}

module.exports.undo = function(id){
    return axios.patch(`http://localhost:3000/tasks/`+id, {
                                "doneAt": "",
                            })
            .then(resp0 => {
                return axios.get('http://localhost:3000/tasks?_sort=date')
                    .then(resp => {
                        return resp.data
                    })
                    .catch(erro => {
                        return erro
                    })
            })
            .catch(erro => {
                return erro
            })
}

module.exports.do = function(id,doneAt){
    return axios.patch(`http://localhost:3000/tasks/`+id, {
                                "doneAt": doneAt,
                            })
            .then(resp0 => {
                return axios.get('http://localhost:3000/tasks?_sort=date')
                    .then(resp => {
                        return resp.data
                    })
                    .catch(erro => {
                        return erro
                    })
            })
            .catch(erro => {
                return erro
            })
}

module.exports.delete = function(id){
    return axios.delete(`http://localhost:3000/tasks/`+id)
            .then(resp0 => {
                return axios.get('http://localhost:3000/tasks?_sort=date')
                    .then(resp => {
                        return resp.data
                    })
                    .catch(erro => {
                        return erro
                    })
            })
            .catch(erro => {
                return erro
            })
}

module.exports.add = function(object){
    return axios.post(`http://localhost:3000/tasks`,{
        date: object.date, 
        who: object.who,
        description : object.description,
        doneAt: ""
    })
            .then(resp0 => {
                return axios.get('http://localhost:3000/tasks?_sort=date')
                    .then(resp => {
                        return resp.data
                    })
                    .catch(erro => {
                        return erro
                    })
            })
            .catch(erro => {
                return erro
            })
}

module.exports.edit = function(object){
    return axios.put(`http://localhost:3000/tasks/`+object.id, {
        'id': object.id,
        'who': object.who,
        'description': object.description,
        'date': object.date,
        'doneAt': object.doneAt
    })
            .then(resp0 => {
                return axios.get('http://localhost:3000/tasks?_sort=date')
                    .then(resp => {
                        return resp.data
                    })
                    .catch(erro => {
                        return erro
                    })
            })
            .catch(erro => {
                return erro
            })
}

