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
var Link     = ReactRouter.Link;




var AppView = React.createClass({
  render: function(){   
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>React Boilerplate!</title>
          <link rel="stylesheet" type='text/css' href="/app.css" />
          <script type="text/javascript" src="/app.js"></script>
        </head>
        <body>
        <div id="container">
          <h1>React Boilerplate!</h1>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Routes path={this.props.path}>
            <Route path="/" handler={HomeView} />
            <Route path="/about" handler={AboutView} />
            <Route path="*" handler={HomeView} />
          </Routes>
        </div>
        </body>
      </html>
    );
  }
});


module.exports = AppView;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(<AppView />, document);
  };
}
