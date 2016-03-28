define(["./authenticateService","./chatService"],function(authenticateService,chatService){
	var fn=function(app){
	app.service("authenticate",authenticateService);
	app.service("sock", chatService)
};
return fn;
});
