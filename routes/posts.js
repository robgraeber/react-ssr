module.exports = function(app){
    app.get('/api/posts/:id', function (req, res){
        res.send({results:[], status:"OK"});
    });
    app.post('/api/posts', function (req, res){
        res.send({results:[], status:"OK"});
    });
    app.put('/api/posts/:id', function (req, res){
        res.send({results:[], status:"OK"});
    });
    app.delete('/api/posts/:id', function (req, res){
        res.send({results:[], status:"OK"});
    });
};
