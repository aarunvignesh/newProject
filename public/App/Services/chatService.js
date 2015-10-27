define(["angular","primus"],function(){
	var chatService=["authenticate","primus",function(authenticate,primus){
		this.joinMe=function(userObj){
			primus.send("initialHandshake",userObj);
		};	
	}];
	return chatService;
});