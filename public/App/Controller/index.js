define(["./loginController","./profileController","./verifyController","./messagesController","./settingsController"],
	function(loginController,profileController,verifyController,messagesController,settingsController){
	var fn=function(app){
	app.controller("loginController",loginController);
	app.controller("profileController",profileController);
	app.controller("verifyController",verifyController);
	app.controller("messagesController",messagesController);
	app.controller("settingsController",settingsController);
	};
return fn;
});