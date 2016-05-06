var mongo=require('mongoose');
var schema=mongo.Schema({
	email:String,
	password:String,
	username:String,
	name:String,
	verifiedEmail:Boolean,
	randomEmailValidationText:String,
	isProfilepicupdated:Boolean,
	isCoverpicupdated:Boolean,
	// otherDetails:{
	// 	phoneNo:"string",
	// 	college:"string",
	// 	school:"string",
	// 	nativePlace:"string",
	// 	friends:"string",
	// 	friendsCount:"integer"
	// },
	otherDetails:Object,
	friendRequestrecievequeue:[{id:String,username:String}],
	friendRequestsentqueue:[{id:String,username:String}],
	friendList : [{id:String,username:String,msgthreadId:String}]
});
schema.methods.validPassword=function(password){
	if(password==this.password){
		return true;
	}
	else
		return false;
};

module.exports=mongo.model("User",schema);
