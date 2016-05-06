
var User=require("./../../lib/User")();
var messageSchema=require("./../../lib/Message")();
var updateUser=require("./../../lib/UpdateUser")();
var multer=require("multer");
var mkdir=require("mkdirp");
var fs = require('fs');
var path = require('path');
var socket_dir = require("./../../Shared/Socket/socketDirectory");

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

var usernameRemover = function(arr,filterValue){
	var occurence = arr.filter(function(val){
		return val.username == filterValue;
	});
	for(var i=0;i<occurence.length;i++){
		arr.splice(arr.findIndex(function(value){return value.username==filterValue}),1);
	}
	return arr;
};

var upload = multer({ storage : receiveConfig}).single('file');

var ctrl={
	createFriendRequest: function(req,res){
		var obj = req.body || {};
		if(obj.requestor && obj.requested){
			User.userById({id:obj.requested.id},function(err,requestedUser){
				if(requestedUser){

					//requestedUser.friendRequestrecievequeue = requestedUser.friendRequestrecievequeue || [];
					requestedUser.friendRequestrecievequeue.push(obj.requestor);
					obj.requested.name = requestedUser.name;
					updateUser.updateUser(requestedUser).then(function(){
							User.userById({id:obj.requestor.id},function(err,requestorUser){
								if(requestorUser){
									//requestorUser.friendRequestsentqueue = requestorUser.friendRequestsentqueue || [];
									obj.requestor.name = requestorUser.name;
									requestorUser.friendRequestsentqueue.push(obj.requested);
									updateUser.updateUser(requestorUser).then(function(){
										var recUsersocket = socket_dir.getuserByusername(obj.requested.username);

										if(recUsersocket.length>0){
											var sendObject = {
												type: "FRIEND_REQUEST",
												requestor:obj.requestor,
												requested:obj.requested
											};
											require("./../../Shared/Socket/Chat/message").sendNotification(recUsersocket,sendObject);
										}
									res.send({code:200,success:"Friend request is successfully raised..."});
									},function(){

										res.send({err:"Facing new issue will recover soon....",code:404})
									})
								}
								else{
									res.send({err:"Facing new issue will recover soon....",code:404});
								}
							});
						},
						function(){
							res.send({err:"Facing New Issue will Recover Soon....",code:404});
						});
				}
				else{
					res.send({err:"Facing new issue will recover soon....",code:404});	
				}
			});
		}
		
	},
	acceptFriendrequest: function(req,res){
		var received_data = req.body;
		if(received_data.acceptor && received_data.requestor){
			var msgProp = {};
			msgProp[received_data.acceptor.username] = {};
			msgProp[received_data.acceptor.username].lastReadmsg = 0;
			msgProp[received_data.requestor.username] = {};
			msgProp[received_data.requestor.username].lastReadmsg = 0;
			messageSchema.createMessagethread({
				participants:msgProp
			},function(err,msgSchema){
				if(msgSchema){
						console.log(msgSchema);
						User.userById({id:received_data.acceptor.id},function(err,acceptorUser){
							if(acceptorUser){
								var filteredCollection = usernameRemover(acceptorUser.friendRequestrecievequeue ,received_data.requestor.username);
								received_data.requestor.msgthreadId = msgSchema._id;
								acceptorUser.friendList.push(received_data.requestor);
								updateUser.updateUser(acceptorUser).then(function(){
									User.userById({id:received_data.requestor.id},function(err,requestorUser){
										if(requestorUser){
											var filteredCollection = usernameRemover(requestorUser.friendRequestsentqueue ,received_data.acceptor.username);
											received_data.acceptor.msgthreadId = msgSchema._id;
											requestorUser.friendList.push(received_data.acceptor);
											updateUser.updateUser(requestorUser).then(function(){

												res.send({code:200,success:"Friend successfully added..."});
											},function(){

												res.send({err:"Facing new issue will recover soon....",code:404})
											})
										}
										else{
											res.send({err:"Facing new issue will recover soon....",code:404});
										}
									});
								});
							}
							else{
								res.send({err:"Facing new issue will recover soon....",code:404});
							}
						});
				}
				else{
					res.send({err:"Facing new issue will recover soon....",code:404});
				}
			});
		}
	},
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
						var userObj = {};
						userObj.username = user[0].username;
						userObj.name = user[0].name;
						userObj.otherDetails = user[0].otherDetails;
						userObj.id = user[0]._id;
						userObj.username = user[0].username;
						userObj.isCoverpicupdated = user[0].isCoverpicupdated;
						userObj.isProfilepicupdated = user[0].isProfilepicupdated;
						userObj.friendList = user[0].friendList;
						userObj.friendRequestqueue = user[0].friendRequestqueue;
						userObj.friendList = user.friendList,
						userObj.friendRequestrecievequeue = user[0].friendRequestrecievequeue,
						userObj.friendRequestsentqueue = user[0].friendRequestsentqueue
						res.send({success:"foreign details",user:userObj,req:req.user,code:202});
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
