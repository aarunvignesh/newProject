
var data=require("./../Data/Message");
var mongoose = require("mongoose");
var obj={
	createMessagethread:function(args,callback){
	 data.createMessagethread(args,callback);
  },
  pushMessage : function(args, callback){
    data.pushMessage(args, callback);
  },
  retrieveMessages: function(args,callback){
  	var friendList = args.friendList.map(function(val){
  		return mongoose.Types.ObjectId(val);
  	});
  	var buildArray = [
  		{
  			$match:
  					{
               			_id:
               				{
               					$in:friendList
               				}
           			}
    	},
    	{
        	$unwind:"$account_users"
      	},
      	{
          	$match:{account_users:{$ne:args.username}}
      	},{
        	$project:{
                lastReadmsg:"$participants."+args.username+".lastReadmsg",
                account_users:1,
                totalMsgCount:{$size:"$messageThread"},
                msgList:{$slice:["$messageThread",-10]}
            }  
        }];
  	data.retrieveMessages(buildArray,callback);
  }
};
module.exports=function(){
	return obj;
}
