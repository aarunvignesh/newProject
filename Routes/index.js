var app=require('express')();
var control=require("./Control");
var passport=require('passport');
var profileRoutes=require("./Profile/index");
var messageRoutes=require("./Message/index");


app.get("/",control.fileRender);
app.post("/signIn",passport.authenticate('local-login',{
	successRedirect:"/success",
	failureRedirect:"/failiure",
	failureFlash:true
}));
app.post("/signUp",passport.authenticate('local-signup',{
	successRedirect:"/success",
	failureRedirect:"/failiure",
	failureFlash:true
}));


app.get("/success",control.successLogin);
app.get("/failiure",control.failiureLogin);
app.get("/knowErrReason",control.knowErrorReason);
app.get("/template/:needTemplate",control.templateThrower);
app.post("/logout",control.logoutUser);

app.post("/api/rndtxtValidate",control.randomTextValidator);
app.get("/api/checkUserName/:username",control.checkUserName);
app.get("/api/regenPin/:id",control.randomTextGenerator);
app.use(profileRoutes);
app.use(messageRoutes);


app.all("*",function(req,res,next){
	if(req.isAuthenticated()){
		res.redirect("/");
	}
	else{
		res.redirect("/");
	}
});

module.exports=app;
