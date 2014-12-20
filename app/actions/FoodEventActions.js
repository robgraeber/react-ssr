var request = require('superagent-promise');

module.exports = {
    updateFoodEvents: function (context, address) {
        return request.get('http://www.foodbot.io/api?address='+address).end()
        .then(function (res){
            context.dispatch('FoodEvent.NewData', res.body.results);
        });
    }
};