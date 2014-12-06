var nodeJsx      = require('node-jsx').install({extension: '.jsx', addDocblock: true});
var fs           = require('fs');
var url          = require('url');
var React        = require('react');
var Promise      = require('bluebird');
var Router       = require('react-router');
var routes       = require('./app/Router');
var Dispatcher   = require('./app/Dispatcher');

//Calls all static fetchData functions along route and populates stores
function fetchData(activeRoutes, params, context) {
    var promises = [];
    activeRoutes.forEach(function (route) {
        if(route.handler.fetchData)
            promises.push(route.handler.fetchData(params, context));
    });
    return Promise.settle(promises)
    .catch(function (){
        console.log("Fetch Data - Err:", arguments);
    });
};

//renders the app to html
var renderApp = function (req, res, next) {
    var urlPath = url.parse(req.url).pathname;

    Router.run(routes, urlPath, function (Handler, state){
        var context = Dispatcher.createContext();
        Promise.all([Handler, state, fetchData(state.routes, state.params, context)])
        .spread(function (Handler, state){
            var component = Handler({params: state.params, context: context});
            var html = React.renderToString(component);
            res.send(html);
        })
        .catch(function (){
            console.log("err:", arguments);
        });
    });
    
};
module.exports = renderApp;