var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Component = module.exports = React.createClass({
    render: function (){   
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>React Boilerplate</title>
                    <link rel="stylesheet" type='text/css' href="/app.css" />
                </head>
                <body>
                    <div id="container">
                        <h1>React Boilerplate!</h1>
                        <Link to="homeView">Home</Link>
                        <Link to="aboutView" params={{id: 2}}>About</Link>
                        <RouteHandler params={this.props.params} context={this.props.context} />
                    </div>
                </body>
                <script dangerouslySetInnerHTML={{ __html: "window.data = "+JSON.stringify(this.props.context.dehydrate()) }}></script>
                <script type="text/javascript" src="/app.js" defer></script>
            </html>
        );
    }
});