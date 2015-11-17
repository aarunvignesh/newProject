
var User=require("./../../lib/User")();
var updateUser=require("./../../lib/UpdateUser")();

var ctrl={
	fetchUserdetails:function(req,res){
		if(req.body.username && req.user){
			User.userByUserName({username:req.body.username}
			,function(err,user){
				console.log(user[0]._id==req.user._id);
				console.log(user[0]._id);
				console.log(req.user._id);
				if(user[0]._id+"" == req.user._id+""){

					res.send({success:"admin user"});

				}
				else{
					res.send({success:"other user",user:user[0],req:req.user});
				}
			});
		}
	}
};

module.exports=ctrl;