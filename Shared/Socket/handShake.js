
var socketServer = require("./mainSocket").getSocketserver(),
  userController = require("./../../lib/User")(),
  updateUser = require("./../../lib/UpdateUser")();

module.exports = function(spark,msg) {

  userController.userById({id:msg.id},function(err,user){
    if(user){
          
          if(user.socketId.indexOf(spark.id)<0){
          user.socketId.push(spark.id);

          var defer = updateUser.updateUser(user);
          defer.then(function(){
            socketServer.spark(spark.id).send("handshake:success");
          },
          function(){
            socketServer.spark(spark.id).send("handshake:failiure");
          });
        }

    }
    else if(err) {

       socketServer.spark(spark.id).send("handshake:failiure");
    }
  });
}
