/**
 * Created by EMD on 5/4/2015.
 */
var primus=require("primus"),
	room=require("primus-rooms"),
    emitter=require("primus-emitter"),
	cluster=require("primus-cluster"),
	socketConfigObject={
		transformer:"engine.io",
		parser:"json"
	},
	primusServer
	,path=require('path');

var create=function(server){
    primusServer=new primus(server,socketConfigObject);

    //primusServer.use('rooms', room);

    primusServer.use('emitter', emitter);

   // primusServer.use('cluster', cluster);

    primusServer.library();

    primusServer.on('connection',function(spark){

        spark.on("data",function(ev){
            console.log(ev);
        });
        
    	spark.on('initialHandshake',function(msg){
            console.log(msg);
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