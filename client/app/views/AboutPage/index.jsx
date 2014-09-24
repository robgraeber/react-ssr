var React = require('react');

var AboutView = React.createClass({
  getInitialState: function() {
    var state = {
      count: 0
    };
    return state;
  },
  increment: function() {
    this.setState({ count: this.state.count + 1 });
  },
  render: function(){   
    return (
      <div>
        <h3>ABOUT</h3>
        <div>This is the about view</div>
        <div onClick={this.increment}>This is the count: {this.state.count}</div>
      </div>
    );
  }
});

module.exports = AboutView;