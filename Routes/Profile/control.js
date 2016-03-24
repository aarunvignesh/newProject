
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
				res.sendFile(path.resolve(__dirname+"/../../pattern.png"));
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
	},
  updateUser:function(req,res){
    if(req.body.username){
        User.userById({id:req.user._id},function(err,user){
            var received_data = req.body;
            if(received_data.name){
              user.name = received_data.name;
            }
            if(received_data.otherDetails){
              user.otherDetails= received_data.otherDetails;
            }
            console.log(user);
            var defer = updateUser.updateUser(user);
            defer.then(function(){
              res.send({code:200,success:"User detail updated"});
            },
            function(){
              res.send({err:"Facing New Issue will Recover Soon....",code:404});
            });
        });
    }
    else {
      res.send({err:"Username Required:::"});
    }
  },
  search:function(req,res){
    var whereOptions = {verifiedEmail:true};
    if(req.query.name){
      whereOptions.name = new RegExp("^"+req.query.name);
    }
    else if(req.query.email){
      whereOptions.email = new RegExp("^"+req.query.name);
    }
    if(req.query.name || req.query.email)
    User.searchUser(whereOptions,function(err,user){
      if(user){
        res.send(user.map(function(val){
          return {name:val.name,username:val.username }
        }));
      }
    });
    else{
      res.status(200).send({})
    }
  }
};

module.exports=ctrl;
