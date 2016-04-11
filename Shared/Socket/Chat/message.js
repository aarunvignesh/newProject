var socketServer = require("./../mainSocket").getSocketserver(),
  userController = require("./../../../lib/User")(),
  updateUser = require("./../../../lib/UpdateUser")(),
  socketDirectory = require("./../socketDirectory");

module.exports =  {

  receiveMessage : function(spark,msg){
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
      userController.findById({id:msg.userid},function(err,user){
          
      });
  }

};
