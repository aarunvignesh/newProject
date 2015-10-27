define(["./authenticateService","./chatService"],function(authenticateService,chatService){
	var fn=function(app){
	app.service("authenticate",authenticateService);
	app.service("chatService", chatService)
};
return fn;
});