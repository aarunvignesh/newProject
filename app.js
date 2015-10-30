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
require('dotenv').load();
var config=require('./config');

var mongoose=require('mongoose').connect(config("mongo"));
app.use(body.urlencoded());
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

var httpServer=http.createServer(app).listen(config("server").port);
require("./Shared/Socket/mainSocket").create(httpServer);