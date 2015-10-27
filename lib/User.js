
var data=require("./../Data/User");
var obj={
	signIn:function(args,callback){
	 data.signIn(args,callback);
	},
	signUp:function(args,callback){
	 data.signUp(args,callback);
	},
	userById:function(args,callback){
	 data.userById(args,callback);	
	}
};
module.exports=function(){
	return obj;
}