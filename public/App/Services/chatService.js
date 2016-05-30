define(["angular","primus"],function(){
	var eventQueue = {};
	var chatService=["primus","$rootScope","visor",
	function(primus,$rootScope,visor){

		var scope= this;

		this.listen = function(eventname,callback){
			if(eventQueue[eventname]){
				eventQueue[eventname].push(callback);
			}
			else{
				eventQueue[eventname]=[];
				eventQueue[eventname].push(callback);
			}
		};

		this.unbind = function(eventname){
			if(eventname){
				if(eventQueue[eventname]){
					eventQueue[eventname].shift();
				}
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

		this.msgList = {};

		this.friendList = {};

		this.joinMe=function(userObj){
			if(!$rootScope.connectionEstablished){
				var msgList,sendObj={};

				if(visor.authData.friendList && visor.authData.friendList.length>0){
					msgList = visor.authData.friendList.map(function(val){return val.msgthreadId;})
				}
				else{
					msgList = [];
				}

				sendObj.msgList = msgList;
				sendObj.username = visor.authData.username;
				this.receive("handshake:success",function(result){
					console.log("Received Success");
					console.log(result);
					result.forEach(function(frnd,index){
						scope.msgList[frnd.account_users] = scope.msgList[frnd.account_users] || [];
						scope.friendList[frnd.account_users] = scope.friendList[frnd.account_users] || {};
						scope.friendList[frnd.account_users].lastReadmsg = frnd.lastReadmsg;
						scope.friendList[frnd.account_users].totalMsgCount = frnd.totalMsgCount;
						var tmp_msgList = [];
						if(scope.msgList[frnd.account_users].length > 0){
							tmp_msgList = scope.msgList[frnd.account_users];
							scope.msgList[frnd.account_users] = [];
							scope.msgList[frnd.account_users] = frnd.msgList;
							for(var i=0;i<tmp_msgList.length;i++){
								scope.msgList[frnd.account_users].push(tmp_msgList[i]);
							}
						}
						else{
							scope.msgList[frnd.account_users] = frnd.msgList;
						}

						scope.emit("loadMessages",scope.msgList);
					});
				});
				this.receive("handshake:failiure",function(){
					console.log("{Handshake Failed}");
				});
				this.receive("receive:message",function(msg){
					scope.msgList[msg.from] = scope.msgList[msg.from] || [];
					scope.msgList[msg.from].push(msg);
					scope.emit("messageReceived",msg);
					// if(msg.from == $scope.senderDetails.username){
					// 	$scope.receivePanel[msg.from] = $scope.receivePanel[msg.from] || [];
					// 	$scope.receivePanel[msg.from].push(msg);
					// 	$scope.$apply();
					// }
					//else{

					//}
				});

				this.send("initialHandshake",sendObj);
				$rootScope.connectionEstablished=true;
			}
		};
	}];
	return chatService;
});
