var socketServerobj = require("./../mainSocket"),
  userController = require("./../../../lib/User")(),
  updateUser = require("./../../../lib/UpdateUser")(),
  socketDirectory = require("./../socketDirectory"),
  messageLib = require("./../../../lib/Message")();

module.exports =  {

  receiveMessage : function(spark,msg){
    socketServer = socketServerobj.getSocketserver();
      var senderIds = socketDirectory.getuserByusername(msg.to);

       var saveMsg = {
                        from:msg.username,
                        to:msg.to,
                        message:msg.message,
                    };
        messageLib.pushMessage({id:msg.msgthreadId,totalMsgCount:msg.totalMsgCount,message:saveMsg},function(err,message){
            if(message){
              console.log("Message Successfully Posted in DB");
            }
        });

      senderIds.forEach(function(senderId){
        var sendWrapper = {};
        sendWrapper.from = msg.username;
        sendWrapper.message = msg.message;
        //Sending Message to the corresponding user
        var sender = socketServer.spark(senderId);

        if(sender){
            socketServer.spark(senderId).send("receive:message",sendWrapper);
        }
        else{
            console.log("User Not online");
        }

      });
      
  },
  updateReadmessage:function(msg){
      messageLib.updateReadmessage(msg);
  },
  sendNotification : function(sockets,msg){
      
      socketServer = socketServerobj.getSocketserver();
       sockets.forEach(function(senderId){

        var sender = socketServer.spark(senderId);
        if(sender){
            socketServer.spark(senderId).send("notification",msg);
        }
        else{
            console.log("User Not online");
        }
      });
  }

};
