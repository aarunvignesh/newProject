
var User=require("./../../lib/User")();
var updateUser=require("./../../lib/UpdateUser")();
var multer=require("multer");
var mkdir=require("mkdirp");
var fs = require('fs');
var path = require('path');

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

var receiveConfig = multer.diskStorage({
	destination: function(req,file,callback){
		mkdir('./account/'+req.user.username,function(err){
			if(err){
				callback(err);
			}
			else{

				callback(null,'./account/'+req.user.username);
			}
		});
	},
	filename: function(req,file,callback){
		callback(null,req.params.type+".jpeg");
	}
});

var upload = multer({ storage : receiveConfig}).single('file');

var ctrl={
	fetchUserdetails:function(req,res){
		if(req.body.username && req.user){
			User.userByUserName({username:req.body.username}
			,function(err,user){
				if(err){
					res.send({err:"Facing new issue will recover soon....",code:500});
					return false;
				}
				if(user.length>0){
					if(user[0]._id.equals(req.user._id)){

						res.send({success:"admin user",code:200});
					}
					else{
						
						res.send({success:"foreign details",user:user[0],req:req.user,code:202});
					}
				}
				else{
					res.send({result:"Searching unregistered user...",code:404});
				}
			});
		}
		else{
			res.send({result:"redirect back...",code:420});
		}
	},
	photoThrower:function(req,res){
		if(fileExists("./account/"+req.params.username+"/"+req.params.type+".jpeg")){
			res.sendFile(path.resolve(__dirname+"/../../account/"+req.params.username+"/"+req.params.type+".jpeg"));
		}
		else{
			if(req.params.type=="cover"){
				res.sendFile(path.resolve(__dirname+"/../../pattern.jpg"));
			}
			else{
				res.sendFile(path.resolve(__dirname+"/../../user.png"));
			}
		}
	},
	receivePhoto:function(req,res){
		upload(req,res,function(err) {
        if(err) {
            return res.send({code:420,error:"Error uploading file."});
        }	
        else{
	        User.userById({id:req.user._id}
				,function(err,user){
					console.log(user);
					if(err){
						res.send({code:420,success:"Facing New issue will recover soon"});
					}
					else if(user){
						if(req.params.type=="profile"){
							user.isProfilepicupdated = true;
						}
						else if(req.params.type=="cover"){
							user.isCoverpicupdated = true;
						}
						console.log(req.params.type);
						console.log(user);
						var defer = updateUser.updateUser(user);
						defer.then(function(){
							res.send({code:200,success:"File is uploaded"});
						},
						function(){
							res.send({err:"Facing New Issue will Recover Soon....",code:404});
						});
					}
					else{
						return res.send({code:420,err:"Unable to find user"});
					}
	        	
	    	});
        }	
    });
	}
};

module.exports=ctrl;