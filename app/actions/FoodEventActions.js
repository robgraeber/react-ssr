var request = require('superagent-promise');

module.exports = function(context){
    return {
        updateFoodEvents: function (address) {
            return request.get('http://www.foodbot.io/api?address='+address).end().then(
                function (res){
                    context.dispatch('FoodEvent.Data', res.body.results);
                }
            );
        }
    };
};