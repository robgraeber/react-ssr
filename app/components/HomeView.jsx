var React = require('react');
var StoreMixin = require('fluxible-app').StoreMixin;
var FoodEventStore = require('../stores/FoodEventStore');
var FoodEventActions = require('../actions/FoodEventActions');

var Component = module.exports = React.createClass({
    mixins: [StoreMixin],
    statics: {
        storeListeners: [FoodEventStore],
        fetchData: function (params, context) {
            return FoodEventActions.updateFoodEvents("SF", context);
        }
    },
    getInitialState: function () {
        return this.getStateFromStores();
    },
    getStateFromStores: function () {
        return {
            foodEvents: this.getStore(FoodEventStore).foodEvents || []
        };
    },
    componentDidMount: function () {
        if (!this.getStore(FoodEventStore).foodEvents)
            Component.fetchData(this.props.params, this.props.context);
    },
    onChange: function () { this.setState(this.getStateFromStores()); },
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