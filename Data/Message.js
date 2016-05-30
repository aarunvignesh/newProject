var message=require("./../Schema/Message");
var rndGenerate=require("./../Shared/rndTxtgenerate");

var data={
	createMessagethread:function(args,callback){
	 var newMessage = new message();
   		newMessage.participants = args.participants;
   		newMessage.account_users = args.account_users;
   		newMessage.save(function(err,msg){
     		callback(err,msg);
   		});
	},
	pushMessage:function(args,callback){
		var updateReadcount = "participants."+args.message.from+".lastReadmsg";
		var updateItem = {$push:{messageThread:args.message},$set:{}}

		updateItem.$set[updateReadcount] = args.totalMsgCount; 
		message.update({_id:args.id},updateItem,function(err,msg){
			callback(err,msg);
		});
	},
	retrieveMessages:function(args,callback){
		message.aggregate(args,function(err,result){
			callback(err,result);
		});
	},
	updateReadmessage: function(args,callback){
		var updateItem = {$set:{participants:{}}};
		
		updateItem.$set.participants[args.username] = {};

		updateItem.$set.participants[args.username].lastReadmsg = args.totalMsgCount;
		console.log("Called");
		message.findById(args.msgthreadId,{participants:true},function(err,result){
			console.log(result);
		})
		message.update({_id:args.msgthreadId},updateItem);
	}
};
module.exports=data;
