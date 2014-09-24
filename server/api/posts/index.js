var express = require('express');
var route = express.Router();

route.get('/api/posts', function (req, res){
  res.send({results:[], status:"OK"});
});
route.post('/api/posts', function (req, res){
  res.send({results:[], status:"OK"});
});
route.get('/api/posts/:id', function (req, res){
  res.send({results:[], status:"OK"});
});
route.put('/api/posts/:id', function (req, res){
  res.send({results:[], status:"OK"});
});
route.delete('/api/posts/:id', function (req, res){
  res.send({results:[], status:"OK"});
});

module.exports = route;