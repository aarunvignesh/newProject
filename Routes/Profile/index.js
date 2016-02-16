var app=require('express')();
var control=require("./control");


app.post("/api/userdetails",control.fetchUserdetails);
app.post("/api/upload/:type",control.receivePhoto);
app.get("/api/photos/:username/:type",control.photoThrower);
app.post("/api/user/details",control.updateUser);

module.exports=app;
