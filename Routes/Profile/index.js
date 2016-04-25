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

app.post("/api/userdetails",control.fetchUserdetails);
app.post("/api/upload/:type",control.receivePhoto);
app.get("/api/photos/:username/:type",control.photoThrower);
app.post("/api/user/details",control.updateUser);
app.get("/api/search",control.search);
app.post("/api/friendRequest",control.createFriendRequest);
app.post("/api/acceptRequest",control.acceptFriendrequest);

module.exports=app;
