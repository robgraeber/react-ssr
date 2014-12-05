var cluster = require('cluster');

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < 1; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
} else {
    var path      = require('path');
    var render    = require('./render');
    var express   = require('express');
    var compress  = require('compression');
    console.log('Worker ' + cluster.worker.id + ' running!');
    
    var app = express();
    app.use(compress());
    app.get('/', render); //render index.html server side
    app.use(express.static(path.join(__dirname, './public')));

    ['./routes/posts'].forEach(function(module){
        require(module)(app);
    });

    app.get('*', render);

    app.set('view engine', 'hbs');
    app.set('port', process.env.PORT || 8000);
    app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
}