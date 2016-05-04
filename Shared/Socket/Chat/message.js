var socketServerobj = require("./../mainSocket"),
  userController = require("./../../../lib/User")(),
  updateUser = require("./../../../lib/UpdateUser")(),
  socketDirectory = require("./../socketDirectory");

module.exports =  {

  receiveMessage : function(spark,msg){
    socketServer = socketServerobj.getSocketserver();
      var senderIds = socketDirectory.getuserByusername(msg.to);
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
