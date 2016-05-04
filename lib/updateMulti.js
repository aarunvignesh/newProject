var data=require("./../Data/UpdateMultiUser");
var obj={
	updateUsers:function(match,args){
	 return data.updateAlluser(match,args);
	}
};
module.exports=function(){
	return obj;
}
