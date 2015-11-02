var path=require('path');
var User=require("./../lib/User")();
var updateUser=require("./../lib/UpdateUser")();

var ctrl={
	templateThrower:function(req,res){
		switch(req.params.needTemplate){
			case "welcome":
						res.sendFile(path.resolve(__dirname+"/../views/Template/welcome.html"));
						break;
			case "diagonostics":
						res.sendFile(path.resolve(__dirname+"/../views/Template/profile.html"));
						break;
			case "chat":
						res.sendFile(path.resolve(__dirname+"/../views/Template/chat.html"));
						break;
			case "illegal":
						res.sendFile(path.resolve(__dirname+"/../views/Template/illegal.html"));
						break;
			case "verify":
						res.sendFile(path.resolve(__dirname+"/../views/Template/verify.html"));
						break;
		}
	},
	successLogin:function(req,res){
		if(req.user){
			User.userById({id:req.user._id},function(err,user){
				if(err){
					res.send({err:"Error Occured with Database"});
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
		if(req.body.id){
			User.userById({id:req.body.id},function(err,user){
				if(err){
					res.send({err:"Error Occured"});
				}
				else if(user){
					if(req.body.verifyPin===user.randomEmailValidationText){
						user.verifiedEmail=true;
						var defer=updateUser.updateUser(user);
						defer.then(function(){
							res.send({success:"Update Successful.... Access granted..."});
						},
						function(){
							res.send({err:"Facing New Issue will Recover Soon...."});
						});
					}
					else{
						res.send({err:"Wrong PIN"});
					}
				}
			});
		}
	},
	failiureLogin:function(req,res){
		res.send({err:"User Auhentication Failed"});
	},
	fileRender:function(req,res){
		res.render(require('./../config')("htmlFile"));
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