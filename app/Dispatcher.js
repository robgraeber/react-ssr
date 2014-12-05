var Dispatchr = require('dispatchr')();

['./stores/FoodEventStore'].forEach(function (modulePath) {
    Dispatchr.registerStore(require(modulePath));
});

module.exports = {
    createContext: function(){
        return new Dispatchr({});
    }
}