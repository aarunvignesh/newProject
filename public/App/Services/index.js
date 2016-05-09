define(["./authenticateService","./chatService","./msgService"],
	function(authenticateService,chatService,msgService){
	var fn=function(app){
	app.service("authenticate",authenticateService);
	app.service("sock", chatService);
	app.service("message",msgService);
};
return fn;
});
