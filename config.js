require('dotenv').load();
var config=require('config');

console.log(config);

module.exports=function(server){
	var obj;
	switch(server){
		case "mongo":
				obj=config.mongo.url+":"+config.mongo.port+"/"+config.mongo.database;
				break;	
		case "server":
				obj=process.env.PORT?{port:process.env.PORT}:config.server;
				break;
		case "htmlFile":
				obj=config.htmlFileName;
				break;	
		case "emailAuthenDetails":
				obj=config.email;
				break;
		case "redis":
				obj=config.redis;
				break;			
	}
	return obj;
}