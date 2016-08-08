define(["./loginController","./profileController","./verifyController","./messagesController","./settingsController","./chatController",
	"./friendsDialogController","./notifyDialogController"],
	function(loginController,profileController,verifyController,messagesController,settingsController,chatController
		,friendsDialogController,notifyDialogController){
	var fn=function(app){
	app.controller("loginController",loginController);
	app.controller("profileController",profileController);
	app.controller("verifyController",verifyController);
	app.controller("messagesController",messagesController);
	app.controller("settingsController",settingsController);
	app.controller("chatController",chatController);
	app.controller("friendsDialogController",friendsDialogController);
	app.controller("notifyDialogController",notifyDialogController);
	};
return fn;
});
