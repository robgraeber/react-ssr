var React = require('react'),
    Router = require('react-router'),
    Dispatcher = require('./Dispatcher'),
    AboutView = require('./components/AboutView'),
    HomeView = require('./components/HomeView'),
    LayoutView = require('./components/LayoutView');

var Route    = Router.Route,
    NotFound = Router.NotFoundRoute;

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