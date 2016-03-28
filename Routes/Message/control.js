var User=require("./../../lib/User")();
var updateUser=require("./../../lib/UpdateUser")();

module.exports = {
  getFriends:function(req,res){
    User.searchUser({verifiedEmail:true},function(err,user){
      if(user){
        res.send(user.map(function(val){
          return {
            username:val.username,
            name:val.name
          }
        }));
      }
      else if(err){
        res.send([]);
      }
    });
  }
};
