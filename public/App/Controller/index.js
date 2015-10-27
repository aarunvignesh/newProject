define(["./loginController","./profileController"],function(loginController,profileController){
	var fn=function(app){
	app.controller("loginController",loginController);
	app.controller("profileController",profileController);
	};
return fn;
});