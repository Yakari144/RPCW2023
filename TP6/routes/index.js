var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.list()
    .then(pessoas => {
      res.render('index', { plist: pessoas, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de pessoas"})
    })
});

/* GET Student Form. */
router.get('/pessoas/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPessoaForm', {d: data})
});

/* GET Student page. */
router.get('/pessoas/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('pessoa', { p: pessoa, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Student Update Form. */
router.get('/pessoas/edit/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('updatePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Student Delete Form. */
router.get('/pessoas/delete/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('deletePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Delete Confirmation */
router.get('/pessoas/delete/:idPessoa/confirm', (req,res)=>{
  Pessoa.deletePessoa(req.params.idPessoa)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
})

// POST Student Form Data
router.post('/pessoas/registo', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  req.body.desportos=req.body.desportos.split(',')
  req.body.figura_publica_pt=req.body.figura_publica_pt.split(',')
  req.body.animais=req.body.animais.split(',')
  req.body.destinos_favoritos=req.body.destinos_favoritos.split(',')
  Pessoa.addPessoa(req.body)
    .then(pessoa => {
      res.render('addPessoaConfirm', {p: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de pessoa"})
    })
})

// POST Student Update Form
router.post('/pessoas/edit/:id', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  var newPessoa = {}
  newPessoa._id = req.params.id
  newPessoa.nome = req.body.nome
  newPessoa.idade = req.body.idade
  newPessoa.sexo = req.body.sexo
  newPessoa.morada = {'cidade':req.body.cidade,'distrito':req.body.distrito}
  if(req.body.BI)
    newPessoa.BI = req.body.BI
  else
    newPessoa.CC = req.body.CC
  if(req.body.descrição)
    newPessoa.descrição = req.body.descrição
  newPessoa.profissao = req.body.profissao
  newPessoa.partido_politico = {'party_abbr':req.body.party_abbr,'party_name':req.body.party_name}
  if(req.body.religiao)
    newPessoa.religiao = req.body.religiao
  newPessoa.desportos=req.body.desportos.split(',')
  newPessoa.animais=req.body.animais.split(',')
  newPessoa.figura_publica_pt=req.body.figura_publica_pt.split(',')
  newPessoa.marca_carro=req.body.marca_carro
  newPessoa.destinos_favoritos=req.body.destinos_favoritos.split(',')
  newPessoa.atributos={
    "fumador": req.body.fumador==''?true:false,
    "gosta_cinema": req.body.gosta_cinema==''?true:false,
    "gosta_viajar": req.body.gosta_viajar==''?true:false,
    "acorda_cedo": req.body.acorda_cedo==''?true:false,
    "gosta_ler": req.body.gosta_ler==''?true:false,
    "gosta_musica": req.body.gosta_musica==''?true:false,
    "gosta_comer": req.body.gosta_comer==''?true:false,
    "gosta_animais_estimacao": req.body.gosta_animais_estimacao==''?true:false,
    "gosta_dancar": req.body.gosta_dancar==''?true:false,
    "comida_favorita": req.body.comida_favorita,
  }
  console.dir(newPessoa)
  Pessoa.updatePessoa(newPessoa._id,newPessoa)
    .then(pessoa => {
      res.render('updatePessoaConfirm', {p: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo de pessoa"})
    })
})

module.exports = router;
