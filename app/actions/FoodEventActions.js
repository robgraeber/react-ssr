var request = require('superagent-promise');

module.exports = {
    getFoodEventsForAddress: function (address, context) {
        return request.get('http://www.foodbot.io/api?address='+address).end()
        .then(function (res){
            context.dispatch('foodEventData', res.body.results);
        });
    }
}