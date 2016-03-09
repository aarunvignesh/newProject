"use strict";
var http=require('http');
var express=require('express');
var app = new express();
var body=require('body-parser');
var path=require('path');
var routes=require("./Routes/index");
var session=require('express-session');
var passport=require('passport');
var local=require('passport-local').Strategy;
var localStrategy=require('./Shared/Passport');
var flash=require('connect-flash');

// var cluster=require('cluster');
// var cpuNo=require('os').cpus().length;
// if(cluster.isMaster){
// 	for(i=0;i<cpuNo;i++){
// 		cluster.fork();
// 	}
// 	cluster.on('exit',function(worker,code,signal){
// 		console.log("Worker died" +worker.process.pid);
// 		cluster.fork();
// 	});
// 	return;
// }

var config=require('./config');

var mongoose=require('mongoose').connect(config("mongo"));
app.use(body.urlencoded({extended:true}));
app.use(body.json());


app.set('view engine','jade');
app.engine('html',require('ejs').renderFile);
app.set('views',path.join(__dirname,"views"));
app.use(session({ secret: 'Shivapingme', saveUninitialized: true, resave: true,path:"/*" })); // session secret
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,"public")));
app.use(routes);
localStrategy(passport);



app.get("*",function(req,res,next){
	if(req.isAuthenticated()){
		next();
	}
	else{
		res.redirect("/");
	}
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || config("server").port;

var httpServer;
if(process.env.OPENSHIFT_NODEJS_IP){
	httpServer=http.createServer(app).listen(port,ipaddress, function() {
		console.log((new Date()) + ' Server is listening on port '+ipaddress + ':' + port);
	});
}
else{
	httpServer=http.createServer(app).listen(port, function() {
		console.log((new Date()) + ' Server is listening on port '+ipaddress + ':' + port);
	});
}
	require("./Shared/Socket/mainSocket").create(httpServer);
