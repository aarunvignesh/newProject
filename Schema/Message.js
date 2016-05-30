var mongo = require('mongoose');

var schema=mongo.Schema({
    messageThread:[{
    	from:String,
    	to:String,
    	message:String,
    	msgType:{
    		type:String,
    		default:"text",
    	},
    	fileId:{
    		type:String,
    		default:"text"
    	}
    }],
    participants:Object,
    account_users:[String]
});

module.exports = mongo.model("Message",schema);
