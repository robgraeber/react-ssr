var fs           = require('fs');
var url          = require('url');
var path         = require('path');
var cheerio      = require('cheerio');
var express      = require('express');
var Promise      = require('bluebird');
var compress     = require('compression');
var ReactAsync   = Promise.promisifyAll(require('react-async'));
var nodejsx      = require('node-jsx').install({extension: '.jsx', addDocblock: true});
var AppView      = require('../client/app/App');

var app = express();
var indexHtml = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf-8');

var renderApp = function (req, res, next) {
  var urlPath = url.parse(req.url).pathname;
  var appView = AppView({path: urlPath});

  ReactAsync.renderComponentToStringWithAsyncStateAsync(appView)
  .then(function (bodyHtml) {
    var $ = cheerio.load(indexHtml);
    $('body').append(bodyHtml);
    res.send($.html());
  });
}

app.use(compress());
app.get("/", renderApp); //making sure index.html is rendered server side
app.use(express.static(path.join(__dirname, '../public')));

["./api/posts/"].forEach(function (routePath) {
  var router = require(routePath);
  app.use(router);
});
app.get("*", renderApp);


app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
