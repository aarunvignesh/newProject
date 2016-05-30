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
		primusServer, path=require('path'), redis = require('redis'),
		userController=require("./../../lib/User")(),
		updateUser=require("./../../lib/UpdateUser")();

    function createRedisClient() {

      var client = redis.createClient(redisConfig.port,redisConfig.url);

      return client;
    }

var create = function(server){
    primusServer=new primus(server,socketConfigObject);

    //primusServer.use('rooms', room);

    primusServer.use('emitter', emitter);

    //primusServer.use('cluster', cluster);

    primusServer.library();

		var chatControl = require("./Chat/message");

    primusServer.on('connection',function(spark){

        spark.on("data",function(ev){
						console.log("Data");
        });

    		spark.on('initialHandshake',function(msg){

						require("./handShake")(spark, msg);
    		});

				spark.on('user:logout',function(){
					require("./disConnect")(spark);
				});

				spark.on('send:message',function(msg){

					chatControl.receiveMessage(spark,msg);
				});

                spark.on('user:updateReadmsg',function(value){
                    chatControl.updateReadmessage(value);
                });

    });

		primusServer.on('disconnection',require("./disConnect"));
};

module.exports={
    create:create,
    getSocketserver : function() {
			return primusServer;
		}
};
