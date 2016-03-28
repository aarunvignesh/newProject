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
    redis = require('redis'),
		userController=require("./../../lib/User")(),
		updateUser=require("./../../lib/UpdateUser")();
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
						console.log("Data");
        });

    		spark.on('initialHandshake',function(msg){
						userController.userById({id:msg.id},function(err,user){
							if(user){
									user.socketId=spark.id;
									var defer = updateUser.updateUser(user);
			            defer.then(function(){
										primusServer.spark(spark.id).send("handshake:success");
			            },
			            function(){
										primusServer.spark(spark.id).send("handshake:failiure");
			            });
							}
							else if(err){
                 primusServer.spark(spark.id).send("handshake:failiure");
							}
						});
    		});

    });

    primusServer.on('disconnection',function(spark){
			userController.searchUser({socketId:spark.id},function(err,userArr){
				user = userArr[0];
				if(user){
						user.socketId=null;
						var defer = updateUser.updateUser(user);
						defer.then(function(){

						},
						function(){

						});
				}
				else if(err){

				}
			});
    });
};
module.exports={
    create:create,
    mainSocket:function(){return mainSocket;}
};
