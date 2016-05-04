var message=require("./../Schema/Message");
var rndGenerate=require("./../Shared/rndTxtgenerate");
var data={
	createMessagethread:function(args,callback){
	 var newMessage = new message();
   		message.participants = args.participants;
   		message.save(function(err,msg){
     		callback(err,msg);
   		});
	}
};
module.exports=data;
