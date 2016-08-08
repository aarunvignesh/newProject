var User=require("./../../lib/User")();
var updateUser=require("./../../lib/UpdateUser")();

module.exports = {
  getFriends:function(req,res){
    User.userById({id:req.user._id},function(err,user){
      if(user){
        var arr_id = user.friendList.map(function(val){
          return val.id;
        });

        var msgMapper = {};
        user.friendList.forEach(function(value){
            msgMapper[value.username] = value.msgthreadId;
        });

        User.searchUser({_id:{$in:arr_id}},function(error,friends){
            if(friends.length > 0){
                      res.send(friends.map(function(val){
                          return {
                              username:val.username,
                              name:val.name,
                              id:val.id,
                              msgthreadId:msgMapper[val.username]
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
  },

  friends:function(req,res){
        User.userById({id:req.params.id},function(err,user){
      if(user){
        var arr_id = user.friendList.map(function(val){
          return val.id;
        });

        var msgMapper = {};
        user.friendList.forEach(function(value){
            msgMapper[value.username] = value.msgthreadId;
        });

        User.searchUser({_id:{$in:arr_id}},function(error,friends){
            if(friends.length > 0){
                      res.send(friends.map(function(val){
                          return {
                              username:val.username,
                              name:val.name,
                              id:val.id,
                              msgthreadId:msgMapper[val.username]
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
  },
   friendRequests:function(req,res){
        User.userById({id:req.user._id},function(err,user){
      if(user){
        var arr_id = user.friendRequestrecievequeue.map(function(val){
          return val.id;
        });

        var msgMapper = {};

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
