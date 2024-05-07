const express = require('express');
const app = express();
const discoRoutes = express.Router();

let Disco = require('../model/Disco');

// api to add disco
discoRoutes.route('/add').post(function (req, res) {
  let disco = new Disco(req.body);
  disco.save()
  .then(disco => {
    res.status(200).json({'status': 'success','mssg': 'disco added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get users
discoRoutes.route('/').get(function (req, res) {
  Disco.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','users': users});
    }
  });
});

// api to get disco
discoRoutes.route('/disco/:id').get(function (req, res) {
  let id = req.params.id;
  Disco.findById(id, function (err, disco){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','disco': disco});
    }
  });
});

// api to update route
discoRoutes.route('/update/:id').put(function (req, res) {
    Disco.findById(req.params.id, function(err, disco) {
    if (!disco){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        disco.nome = req.body.nome;
        disco.banda = req.body.banda;
        disco.ano = req.body.ano;

        disco.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
discoRoutes.route('/delete/:id').delete(function (req, res) {
  Disco.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = discoRoutes;