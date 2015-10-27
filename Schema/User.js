var mongo=require('mongoose');
var schema=mongo.Schema({
	email:String,
	password:String,
	socketId:String,
	verifiedEmail:Boolean,
	randomEmailValidationText:String,
	// otherDetails:{
	// 	phoneNo:"string",
	// 	college:"string",
	// 	school:"string",
	// 	nativePlace:"string",
	// 	friends:"string",
	// 	friendsCount:"integer"
	// },
	otherDetails:Object
});
schema.methods.validPassword=function(password){
	if(password==this.password){
		return true;
	}
	else 
		return false;
};

module.exports=mongo.model("User",schema);