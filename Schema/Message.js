var mongo = require('mongoose');

var schema=mongo.Schema({
    messageThread:[Object],
    participants:[Object],
    participantIds:[String]
});

module.exports = mongo.model("Message",schema);
