var path=require('path');
var User=require("./../lib/User")();
var updateUser=require("./../lib/UpdateUser")();

var rndGenerate=require("./../Shared/rndTxtgenerate");

var ctrl={
	templateThrower:function(req,res){
		switch(req.params.needTemplate){
			case "welcome":
						res.sendFile(path.resolve(__dirname+"/../views/Template/welcome.html"));
						break;
			case "diagonostics":
						res.sendFile(path.resolve(__dirname+"/../views/Template/profile.html"));
						break;
			case "messages":
						res.sendFile(path.resolve(__dirname+"/../views/Template/messages.html"));
						break;
			case "illegal":
						res.sendFile(path.resolve(__dirname+"/../views/Template/illegal.html"));
						break;
			case "verify":
						res.sendFile(path.resolve(__dirname+"/../views/Template/verify.html"));
						break;
		}
	},
	checkUserName:function(req,res){
		User.userByUserName({username:req.params.username},function(err,user){
			if(err){
				res.send({err:"Facing New Issue will recover soon....",code:404});
			}
			else if(user.length!=0){
				res.send({err:"Requested Username is not available..",code:304});
			}
			else if(user.length==0){
				res.send({success:"Username is available..."});
			}
			
		});
	},
	successLogin:function(req,res){
		if(req.user){
			User.userById({id:req.user._id},function(err,user){
				if(err){
					res.send({err:"Error Occured with Database"});
				}
				else{
					if(user.verifiedEmail){
						
						res.send({id:req.user._id,email:req.user.email,
							validationStatus:true,
							username:user.username,
							isProfilepic:user.isProfilepicupdated,
							isCoverpic:user.isCoverpicupdated
						});
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
	randomTextGenerator: function(req,res){
		console.log(req.params.id);
		User.userById({id:req.params.id},function(err,user){
			if(err){
					res.send({err:"Facing New Issue will recover soon....",code:404});
			}
			else{
				rndGenerate.newRandomTextGenerate(user);
				res.send({success:"Successfully triggered mail Request",code:200});
			}
		});
	},
	randomTextValidator:function(req,res){
		if(req.body.id){
			//checking any users with same requested username
			User.userByUserName({username:req.body.username},function(err,userAvail){
				if(err){
					res.send({err:"Facing New Issue will recover soon....",code:404});
				}
				//User available with requested username
				else if(userAvail.length!=0){
					res.send({err:"Requested Username is not available..",code:304});
				}
				//Username available since no user with requested username
				else if(userAvail.length==0){
					User.userById({id:req.body.id},function(err,user){
						if(err){
							res.send({err:"Facing New Issue will recover soon....",code:404});
						}
						else if(user){
							if(req.body.verifyPin===user.randomEmailValidationText){
								user.verifiedEmail=true;
								user.username=req.body.username;
								var defer=updateUser.updateUser(user);
								defer.then(function(){
									res.send({success:"Update Successful.... Access granted..."});
								},
								function(){
									res.send({err:"Facing New Issue will Recover Soon....",code:404});
								});
							}
							else{
								res.send({err:"Verification PIN is incorrect",code:420});
							}
						}
					});
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