var express = require('express');
var route = express.Router();

route.get('/api/tasks', function (req, res){
  res.send({results:[], status:"OK"});
});
route.post('/api/tasks', function (req, res){
  res.send({results:[], status:"OK"});
});
route.get('/api/tasks/:id', function (req, res){
  res.send({results:[], status:"OK"});
});
route.put('/api/tasks/:id', function (req, res){
  res.send({results:[], status:"OK"});
});
route.delete('/api/tasks/:id', function (req, res){
  res.send({results:[], status:"OK"});
});

module.exports = route;