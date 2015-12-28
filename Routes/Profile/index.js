var app=require('express')();
var control=require("./control");


app.post("/api/userdetails",control.fetchUserdetails);
app.post("/api/upload/:type",control.receivePhoto);

module.exports=app;