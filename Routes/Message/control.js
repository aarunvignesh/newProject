var User=require("./../../lib/User")();
var updateUser=require("./../../lib/UpdateUser")();

module.exports = {
  getFriends:function(req,res){
    User.userById({id:req.user._id},function(err,user){
      if(user){
        var arr_id = user.friendList.map(function(val){
          return val.id;
        });

        User.searchUser({_id:{$in:arr_id}},function(error,friends){
            if(friends.length > 0){
                      res.send(friends.map(function(val){
                          return {
                              username:val.username,
                              name:val.name,
                              id:val.id
                          }
                      }));
            }
            else{
              res.send([])
            }
        });

      }
      else if(err){
        res.send([]);
      }
    });
  }
};
