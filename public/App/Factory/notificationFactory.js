define(["angular"],function(angular){
	var notificationFn=["sock",function(sock){
		var notification={
			initialize:function(){
				console.log(">>>>>Shiva Initialized<<<<<<")
				sock.receive("notification",function(msg){
					console.log(">>>>>Shiva Msg Received<<<<<<")
					console.log(msg);
				});
			}
		};
		return notification;
	}];
	return notificationFn;
});
