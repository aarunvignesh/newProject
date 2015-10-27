var config={
	mongo:{
		url:"mongodb://127.0.0.1",
		port:"27017",
		username:"",
		password:"",
		database:"NewDB"
	},
	redis:{
		url:"",
		port:"",
		username:"",
		password:""
	},
	server:{
		port:1722
	}
};
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
	}
	return obj;
}