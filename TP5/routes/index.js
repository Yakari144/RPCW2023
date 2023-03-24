var express = require('express');
var router = express.Router();
var Task = require('../controllers/tasks')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  var flag = false
  if('func' in req.query){
    flag = (req.query.func == "edit")
  }
  Task.list()
    .then(t => {
      var obj={}
      for(let i=0; i < t.length;i++){
        if(t[i].id == req.query.id)
          obj=t[i]
      }
      res.render('index', { tasks: t, d: data, f : flag, o: obj})
    })
    .catch(erro =>{
      res.render('error',{error: erro})
    }
    )
});

///* POST Register Student page. */
router.post('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  if(req.body.func == "undone"){
  Task.undo(req.body.id)
    .then(t => {
      res.render('index', { tasks: t, d: data })
    })
    .catch(erro =>{
      res.render('error',{error: erro})
    })
  }else if(req.body.func == "done"){
    Task.do(req.body.id,req.body.date)
      .then(t => {
        res.render('index', { tasks: t, d: data })
      })
      .catch(erro =>{
        res.render('error',{error: erro})
      })
  }else if(req.body.func == "delete"){
    Task.delete(req.body.id)
      .then(t => {
        res.render('index', { tasks: t, d: data })
      })
      .catch(erro =>{
        res.render('error',{error: erro})
      })
  }else if(req.body.func == "add"){
    Task.add(req.body)
      .then(t => {
        res.render('index', { tasks: t, d: data })
      })
      .catch(erro =>{
        res.render('error',{error: erro})
      })
  }else if(req.body.func == "editForms"){
    Task.edit(req.body)
      .then(t => {
        res.render('index', { tasks: t, d: data })
      })
      .catch(erro =>{
        res.render('error',{error: erro})
      })
  }
});



module.exports = router;
