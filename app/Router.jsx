var React = require('react');
var Router = require('react-router');
var Dispatcher = require('./Dispatcher');
var AboutView = require('./components/AboutView');
var HomeView = require('./components/HomeView');
var LayoutView = require('./components/LayoutView');

var Route    = Router.Route;
var NotFound = Router.NotFoundRoute;

var routes = (
    <Route path="/" handler={LayoutView}>
        <Route name="aboutView" path="about/:id/?" handler={AboutView} />
        <Route name="homeView" path=":id?/?" handler={HomeView} />
        <NotFound handler={HomeView} />
    </Route>
);

module.exports = routes;

if (typeof window !== 'undefined') {
    window.onload = function() {
        var context = Dispatcher.createContext();
        context.rehydrate(window.data);
        
        Router.run(routes, Router.HistoryLocation, function (Handler, state) {
            React.render(<Handler params={state.params} context={context} />, document);
        });
    };
}