var express = require('express');
var app = express.Router();

app.get('/tasks', function (req, res){
  res.send({results:[], status:"OK"});
});
app.post('/tasks', function (req, res){
  res.send({results:[], status:"OK"});
});
app.get('/tasks/:id', function (req, res){
  res.send({results:[], status:"OK"});
});
app.put('/tasks/:id', function (req, res){
  res.send({results:[], status:"OK"});
});
app.delete('/tasks/:id', function (req, res){
  res.send({results:[], status:"OK"});
});

module.exports = app;