/**
 * Created by EMD on 5/4/2015.
 */
var primus=require("primus"),
	room=require("primus-rooms"),
    emitter=require("primus-emitter"),
	cluster=require("primus-cluster"),
    redisConfig = require("./../../config")("redis"),
	socketConfigObject={
		transformer:"engine.io",
		parser:"json"
        // ,cluster: {
        //     redis: createRedisClient
        // },
        // iknowclusterwillbreakconnections:true
	},
	primusServer
	,path=require('path'),
    redis = require('redis');
    function createRedisClient() {
      var client = redis.createClient(redisConfig.port,redisConfig.url);
      
      return client;
    }

var create=function(server){
    primusServer=new primus(server,socketConfigObject);

    //primusServer.use('rooms', room);

    primusServer.use('emitter', emitter);

    //primusServer.use('cluster', cluster);

    primusServer.library();

    primusServer.on('connection',function(spark){

        spark.on("data",function(ev){
           console.log("DATA");
           console.log(ev);
        });
        
    	spark.on('initialHandshake',function(msg){
            console.log(spark.id);
    	});
        
    });

    primusServer.on('disconnection',function(){
            console.log("User have been Disconnected...");
    });
};
module.exports={
    create:create,
    mainSocket:function(){return mainSocket;}
};