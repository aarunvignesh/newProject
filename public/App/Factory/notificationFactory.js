define(["angular"],function(angular){
	var notificationFn=["sock","toastFactory","visor",function(sock,toastFactory,visor){
		this.checkedNotication = false;
		var notification={
			initialize:function(){
				sock.receive("notification",function(msg){
					switch(msg.type){
						case "FRIEND_REQUEST":
							toastFactory.showToast("<span style='text-transform:uppercase;'>"+msg.requestor.name+"</span>&nbsp;wants to be your friend..");
							visor.authData.friendRequestrecievequeue.push({id:msg.requestor.id,username:msg.requestor.username});
							sock.emit("notification:friendRequest",msg.requestor);
						break;
						case "FRIEND_REQUEST_ACCEPTED":
							toastFactory.showToast("<span style='text-transform:uppercase;'>"+msg.requested.name+"</span>&nbsp;has accepted your friend request");
							visor.authData.friendList.push({id:msg.requested.id,username:msg.requested.username,msgthreadId:msg.msgId});
							sock.msgList[msg.requested.username] = [];
							sock.friendList[msg.requested.username] = {};
							sock.friendList[msg.requested.username].lastReadmsg = 0;
							sock.friendList[msg.requested.username].totalMsgCount = 0; 
							sock.emit("notification:friendRequest",msg.requested);
						break;
						default:	
					}
				});
			},
			setNotification:function(value){
				this.checkedNotication = value;
			}
		};
		return notification;
	}];
	return notificationFn;
});
