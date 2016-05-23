var message=require("./../Schema/Message");
var rndGenerate=require("./../Shared/rndTxtgenerate");

var data={
	createMessagethread:function(args,callback){
	 var newMessage = new message();
   		newMessage.participants = args.participants;
   		newMessage.save(function(err,msg){
     		callback(err,msg);
   		});
	},
	pushMessage:function(args,callback){
		message.update({_id:args.id},{$push:{messageThread:args.message}},function(err,msg){
			console.log(err);
			console.log(msg);
			callback(err,msg);
		});
	},
	retrieveMessages:function(args,callback){
		message.aggregate(args,function(err,result){
			callback(err,result);
		});
	}
};
module.exports=data;
