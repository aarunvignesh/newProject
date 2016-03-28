var app=require('express')();
var control=require("./control");

app.get("/api/getFriends",control.getFriends);

module.exports=app;
