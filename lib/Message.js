
var data=require("./../Data/Message");
var obj={
	createMessagethread:function(args,callback){
	 data.createMessagethread(args,callback);
  },
  pushMessage : function(args, callback){
    data.pushMessage(args, callback);
  }
};
module.exports=function(){
	return obj;
}
