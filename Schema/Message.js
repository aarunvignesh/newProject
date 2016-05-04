var mongo = require('mongoose');

var schema=mongo.Schema({
    messageThread:[Object],
    participants:Object
});

module.exports = mongo.model("Message",schema);
