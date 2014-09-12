var url          = require('url');
var path         = require('path');
var express      = require('express');
var ReactAsync   = require('react-async');
var nodejsx      = require('node-jsx').install({extension: '.jsx', addDocblock: true});
var AppView      = require('../client/app/AppView');

var app = express();
app.use(express.static(path.join(__dirname, '../public')));

["./api/tasks/"].forEach(function (routePath) {
  var router = require(routePath);
  app.use(router);
});

var renderApp = function (req, res, next) {
  var path = url.parse(req.url).pathname;
  var appView = AppView({path: path});
  ReactAsync.renderComponentToStringWithAsyncState(appView, function(err, html) {
    if (err) {
      return next(err);
    }
    res.send('<!doctype html>\n' + html);
  });
}
app.use(renderApp);

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
