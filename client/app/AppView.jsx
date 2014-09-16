var React = require('react');

//monkey patch to prevent deferred loading
require('react-router-component/lib/AsyncRouteRenderingMixin').setRoutingState = function (state,cb) {
  this.replaceState(state, cb);
};
var ReactRouter = require('react-router-component');
var HomeView = require('./HomeView/');
var AboutView = require('./AboutView/');

var Routes   = ReactRouter.Locations;
var Route    = ReactRouter.Location;
var NotFound = ReactRouter.NotFound;
var Link     = ReactRouter.Link;

var AppView = React.createClass({
  render: function(){   
    return (
      <div id="container">
        <h1>React Boilerplaate!</h1>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Routes path={this.props.path}>
          <Route path="/" handler={HomeView} />
          <Route path="/about" handler={AboutView} />
          <NotFound handler={HomeView} />
        </Routes>
      </div>
    );
  }
});

module.exports = AppView;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(<AppView />, document.body);
  };
}
