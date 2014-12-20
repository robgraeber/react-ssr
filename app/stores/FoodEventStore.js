var createStore = require('dispatchr/utils/createStore');

var Store = module.exports = createStore({
    initialize: function () {
        this.foodEvents = null;
    },
    storeName: 'FoodEventStore',
    handlers: {
        'FoodEvent.NewData': function (foodEvents) {
            this.foodEvents = foodEvents;
            this.emitChange();
        }
    },
    dehydrate: function () {
        return {
            foodEvents: this.foodEvents
        };
    },
    rehydrate: function (state) {
        this.foodEvents = state.foodEvents;
    },
});