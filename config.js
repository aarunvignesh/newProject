var config=require('config');

module.exports=function(server){
	var obj;
	switch(server){
		case "mongo":
				obj=config.mongo.url+":"+config.mongo.port+"/"+config.mongo.database;
				break;
		case "redis":
				break;	
		case "server":
				obj=config.server;
				break;
		case "htmlFile":
				obj=config.htmlFileName;
				break;	
		case "emailAuthenDetails":
				obj=config.email;
				break;			
	}
	return obj;
}