var path=require('path');
var User=require("./../lib/User")();

var ctrl={
	templateThrower:function(req,res){
		switch(req.params.needTemplate){
			case "welcome":
						res.sendFile(path.resolve(__dirname+"/../views/Template/welcome.html"));
						break;
			case "diagonostics":
						res.sendFile(path.resolve(__dirname+"/../views/Template/diagonostics.html"));
						break;
			case "chat":
						res.sendFile(path.resolve(__dirname+"/../views/Template/chat.html"));
						break;
			case "illegal":
						res.sendFile(path.resolve(__dirname+"/../views/Template/illegal.html"));
						break;
		}
	},
	successLogin:function(req,res){
		if(req.user){
			User.userById({id:req.user._id},function(err,user){
				if(err){
					res.send({id:req.user._id,email:req.user.email,validationStatus:"NA"});
				}
				else{
					if(user.verifiedEmail){
						res.send({id:req.user._id,email:req.user.email,validationStatus:true});
					}
					else{
						res.send({id:req.user._id,email:req.user.email,validationStatus:false});
					}
				}
			});
			
		}
		else{
			res.send({err:"User has not Authenticated"});
		}
	},
	randomTextValidator:function(req,res){

	},
	failiureLogin:function(req,res){
		res.send({err:"User Auhentication Failed"});
	},
	fileRender:function(req,res){
		res.render("index");
	},
	knowErrorReason:function(req,res){
		res.send(req.flash('message'));
	},
	logoutUser:function(req,res){
		if(req.isAuthenticated()){
			if(req.body.id==req.user._id){
				req.logout();
				res.send({status:"success"});
			}
			else{
				res.send({err:"Cannot Logout the Requested User"});
			}
		}
		else{
			res.send({err:"user already logged out"});
		}
	}
};
module.exports=ctrl;