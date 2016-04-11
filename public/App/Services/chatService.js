define(["angular","primus"],function(){
	var chatService=["primus","$rootScope","visor",function(primus,$rootScope,visor){
		var eventQueue = {};

		this.listen = function(eventname,callback){
			if(eventQueue[eventname]){
				eventQueue[eventname].push(callback);
			}
			else{
				eventQueue[eventname]=[];
				eventQueue[eventname].push(callback);
			}
		};

		this.emit = function(eventname,options){
			if(eventQueue[eventname]){
				for(var i=0;i<eventQueue[eventname].length;i++){
					eventQueue[eventname][i].apply(this,[options]);
				}
			}
		};

		this.send = function(eventname,options){
				options = options || {} ;
				options.username = visor.authData.username ;
				options.userid = visor.authData.id;
				console.log("Socket: "+eventname);
				primus.send(eventname,options);
		};

		this.receive = function(eventname,callback){
				primus.on(eventname,callback);
		};


		this.joinMe=function(userObj){
			if(!$rootScope.connectionEstablished){
				this.send("initialHandshake",userObj);
				this.receive("handshake:success",function(){
					console.log("Received Success");
				});
				this.receive("handshake:failiure",function(){
					console.log("{Handshake Failed}");
				});
				$rootScope.connectionEstablished=true;
			}
		};
	}];
	return chatService;
});
