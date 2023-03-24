var Person = require('../models/pessoa')

// Person list
module.exports.list = () => {
    return Person.find()
        .sort({nome:1})
        .then(docs => {
                return docs
        })
        .catch(erro => {
                return erro
        })
}

module.exports.getPessoa = id => {
    return Person.findOne({_id:id})
        .then(docs => {
                return docs
        })
        .catch(erro => {
                return erro
        })
}

module.exports.addPessoa = a => {
    return Person.create(a)
        .then(Person => {
                return Person
        })
        .catch(erro => {
                return erro
        })
}

module.exports.updatePessoa = (id,a) => {
    return Person.updateOne({_id: id},a)
        .then(Person => {
                return a
        })
        .catch(erro => {
                return erro
        })
}

module.exports.deletePessoa = id => {
    return Person.deleteOne({_id:id})
        .then(Person => {
                return Person
        })
        .catch(erro => {
                return erro
        })
}