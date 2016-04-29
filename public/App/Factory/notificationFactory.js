define(["angular"],function(angular){
	var notificationFn=["sock","toastFactory","visor",function(sock,toastFactory,visor){
		var notification={
			initialize:function(){
				sock.receive("notification",function(msg){
					switch(msg.type){
						case "FRIEND_REQUEST":
							toastFactory.showToast(msg.requestor.name+" wants to be your friend ");
							visor.authData.friendRequestrecievequeue.push({id:msg.requestor.id,username:msg.requestor.username});
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
