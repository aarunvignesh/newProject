var socketServer = require("./mainSocket").getSocketserver(),
  userController = require("./../../lib/User")(),
  updateUser = require("./../../lib/UpdateUser")();

module.exports = function(spark,msg) {
  userController.searchUser({socketId:spark.id},function(err,userArr){
    if(userArr && userArr.length){
      user = userArr[0];
      if(user){
            if(user.socketId.indexOf(spark.id)>-1){
              user.socketId.splice(user.socketId.indexOf(spark.id),1);
              var defer = updateUser.updateUser(user);
              defer.then(function(){

              },
              function(){

              });
            }
          }
    }
    else if(err){

    }
    else if (!userArr.length) {
        console.log("Unauthenticated socket cannot be removed...");
    }

  });
}
