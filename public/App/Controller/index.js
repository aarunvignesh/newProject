define(["./loginController","./profileController","./verifyController","./messagesController","./settingsController","./chatController",
	"./friendsDialogController"],
	function(loginController,profileController,verifyController,messagesController,settingsController,chatController,friendsDialogController){
	var fn=function(app){
	app.controller("loginController",loginController);
	app.controller("profileController",profileController);
	app.controller("verifyController",verifyController);
	app.controller("messagesController",messagesController);
	app.controller("settingsController",settingsController);
	app.controller("chatController",chatController);
	app.controller("friendsDialogController",friendsDialogController);
	};
return fn;
});
