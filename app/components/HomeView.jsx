var React = require('react');
var StoreMixin = require('../mixins/StoreMixin');
var FoodEventStore = require('../stores/FoodEventStore');
var FoodEventActions = require('../actions/FoodEventActions');

var Component = module.exports = React.createClass({
    mixins: [StoreMixin],
    statics: {
        storeListeners: [FoodEventStore],
        fetchData: function (params, context) {
            return FoodEventActions(context).updateFoodEvents("SF");
        }
    },
    getStateFromStores: function(){
        return {
            foodEvents: this.getStore(FoodEventStore).foodEvents || []
        };
    },
    componentDidMount: function () {
        if (!this.getStore(FoodEventStore).foodEvents)
            Component.fetchData(this.props.params, this.props.context);
    },
    render: function () {  
        return (
            <div>
                <h3>HOME</h3>
                <div>This is the home view</div>
                <div>This is the count: {this.state.foodEvents.length}</div>
            </div>
        );
    }
});