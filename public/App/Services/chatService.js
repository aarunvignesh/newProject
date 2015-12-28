define(["angular","primus"],function(){
	var chatService=["authenticate","primus","$rootScope",function(authenticate,primus,$rootScope){
		this.joinMe=function(userObj){
			if(!$rootScope.connectionEstablished){

				primus.send("initialHandshake",userObj);
				$rootScope.connectionEstablished=true;
			}
		};	
	}];
	return chatService;
});