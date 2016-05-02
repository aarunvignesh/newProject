define(["angular"],function(angular){
	var notificationFn=["sock","toastFactory","visor",function(sock,toastFactory,visor){
		var notification={
			initialize:function(){
				sock.receive("notification",function(msg){
					switch(msg.type){
						case "FRIEND_REQUEST":
							toastFactory.showToast("<span style='text-transform:uppercase;'>"+msg.requestor.name+"</span>&nbsp;wants to be your friend");
							visor.authData.friendRequestrecievequeue.push({id:msg.requestor.id,username:msg.requestor.username});
							sock.emit("notification:friendRequest",msg.requestor);
						break;
						default:	
					}
				});
			}
		};
		return notification;
	}];
	return notificationFn;
});
