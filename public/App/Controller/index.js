define(["./loginController","./profileController","./verifyController"],
	function(loginController,profileController,verifyController){
	var fn=function(app){
	app.controller("loginController",loginController);
	app.controller("profileController",profileController);
	app.controller("verifyController",verifyController);
	};
return fn;
});