var message=require("./../Schema/Message");
var rndGenerate=require("./../Shared/rndTxtgenerate");
var data={
	createMessagethread:function(args,callback){
	 var newMessage = new message();
   		newMessage.participants = args.participants;
   		newMessage.save(function(err,msg){
     		callback(err,msg);
   		});
	}
};
module.exports=data;
