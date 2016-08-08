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
app.get("/api/friends/:id",control.friends);
app.get("/api/requests",control.friendRequests);

module.exports=app;
