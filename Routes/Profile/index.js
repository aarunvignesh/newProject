var app=require('express')();
var control=require("./control");

app.post("/api/userdetails",control.fetchUserdetails);


module.exports=app;