var React = require('react');

var Component = module.exports = React.createClass({
    getInitialState: function () {
       return {

       };
    },
    componentDidMount: function () {
    
    },
    componentWillReceiveProps: function (nextProps) {
        
    },
    render: function () {   
        return (
            <div>
                <h3>ABOUT</h3>
                <div>This is the about view</div>
                <div>This is the page id: {this.props.params.id}</div>
            </div>
        );
    }
});