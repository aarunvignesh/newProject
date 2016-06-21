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
		console.log(args.totalMsgCount);
		updateItem.$set[updateReadcount] = args.totalMsgCount; 
		message.update({_id:args.id},updateItem,function(err,msg){
			console.log(msg);
			callback(err,msg);
		});
	},
	retrieveMessages:function(args,callback){
		message.aggregate(args,function(err,result){
			callback(err,result);
		});
	},
	updateReadmessage: function(args,callback){

		var updateReadcount = "participants."+args.username+".lastReadmsg";

		var updateItem = {$set:{}};
		
		updateItem.$set[updateReadcount] = args.totalMsgCount;


		console.log(args.username);
		
		message.update({_id:args.msgthreadId},updateItem,function(err,msg){
			//callback(err,msg);
		});
	},
	sliceMessageThread:function(args,callback){
		var filter = {participants:false,messageThread:{$slice:[args.startLimit,args.endLimit]}}
		console.log(filter);
		message.findById(args.msgthreadId,filter,function(err,result){

			callback(err,result);
		});
	}
};
module.exports=data;
