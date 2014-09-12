var React = require('react');
var HomeView = require('./views/home/HomeView');

var AppView = React.createClass({
  render: function(){   
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>React Boilerplate!</title>
          <link rel="stylesheet" type='text/css' href="app.css" />
          <script type="text/javascript" src="app.js"></script>
        </head>
        <body>
          <div id="container">
            <h1>React Boilerplate!</h1>
            <HomeView />
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
