var React = require('react');
var ReactAsync = require('react-async');

var HomeView = React.createClass({
  mixins: [ReactAsync.Mixin],
  getInitialStateAsync: function(cb) {
    // this is how you set initial state temporarily on client-side
    var state = {
      count: 0
    };

    this.setState(state);
    //then setup the ajax call to change it
    setTimeout(function(){
      state.count = 10;
      cb(null, state);
    }.bind(this), 1000);
  },
  increment: function() {
    this.setState({ count: this.state.count + 1 });
  },
  render: function(){   
    return (
      <div>
        <h3>HOME</h3>
        <div>This is the home view</div>
        <div onClick={this.increment}>This is the count: {this.state.count}</div>
      </div>
    );
  }
});

module.exports = HomeView;