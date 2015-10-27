var data=require("./../Data/UpdateUser");
var obj={
	updateUser:function(args){
	 return data.updateUser(args);	
	}
};
module.exports=function(){
	return obj;
}