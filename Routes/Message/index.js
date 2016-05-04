var app=require('express')();
var control=require("./control");

app.all("/api/*",function(req,res,next){
	if(req.isAuthenticated()){
		next();	
	}
	else{
		res.send({err:"Unauthenticated user"});
	}
});
app.get("/api/getFriends",control.getFriends);

module.exports=app;
