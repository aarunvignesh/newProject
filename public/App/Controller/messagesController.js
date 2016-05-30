define(["angular"],function(){
	var controller=["$scope","$http","$mdSidenav","visor","$state","sock","$timeout",
	function($scope,$http,$mdSidenav,visor,$state,sock,$timeout){

		$scope.senderUsername = visor.authData.username;

		$scope.senderDetails = {};

		$scope.msgPanelreceiver = sock.msgList;

		$scope.receivePanel = {};

		var scroller_setstatus = false;

		var setChatscroller = function(moveDown){
			$timeout(function() {
			if(!scroller_setstatus){
					angular.element(".chat-window").perfectScrollbar();
					scroller_setstatus=true;
				}
				else{
					angular.element(".chat-window").perfectScrollbar();
				}
			if(moveDown){
				var elem = angular.element(".chat-window");
				elem.scrollTop(elem.prop("scrollHeight"));
			}
			}, 10);	
		};

		(function(msgList){

			var friends = Object.keys(msgList);
			for(var i=0;i<friends.length;i++){
				$scope.receivePanel[friends[i]] = [];
				for(var j=0;j<msgList[friends[i]].length;j++){
					$scope.receivePanel[friends[i]].push(msgList[friends[i]][j]);
				}
			}

		})($scope.msgPanelreceiver);

		sock.listen("loadMessages",function(msgList){
			var friends = Object.keys(msgList);
			for(var i=0;i<friends.length;i++){
				$scope.receivePanel[friends[i]] = [];
				for(var j=0;j<msgList[friends[i]].length;j++){
					$scope.receivePanel[friends[i]].push(msgList[friends[i]][j]);
				}
			}
			setChatscroller(true);
		});

		$scope.userFirstname = visor.authData.name.toUpperCase();

		sock.listen("messageReceived",function(value){
			$scope.receivePanel[value.from] = $scope.receivePanel[value.from] || [];
			$scope.receivePanel[value.from].push(value);
			if($scope.senderDetails.username == value.from){
				setChatscroller(true);
				$scope.$apply();
			}
		});

		$scope.changeSenderdetails = function(senderInfo){
				$scope.senderDetails.username = senderInfo.username;
				$scope.senderDetails.name = senderInfo.name;
				$scope.senderDetails.msgthreadId = senderInfo.msgthreadId;
				$scope.friendList.forEach(function(value){
					if(value.username == $scope.senderDetails.username){
						value.lastReadmsg = value.totalMsgCount;
					}
				});
				
				sock.friendList[$scope.senderDetails.username].lastReadmsg = sock.friendList[$scope.senderDetails.username].totalMsgCount;
				
				sock.emit("user:updateReadmsg",{
					msgthreadId 	: senderInfo.msgthreadId,
					totalMsgCount	: sock.friendList[$scope.senderDetails.username].totalMsgCount
				});

				setChatscroller(true);
		};

		$scope.gotoProfile=function(){
			$state.go("profile",{username:$scope.senderUsername});
		};

		$scope.openMsgSlideNav = function(){
			$mdSidenav("msgSlider").toggle();
		};

		// sock.receive("receive:message",function(msg){
		// 		//if(msg.from == $scope.senderDetails.username){
		// 				$scope.receivePanel[msg.from] = $scope.receivePanel[msg.from] || [];
		// 				$scope.receivePanel[msg.from].push(msg);
		// 				$scope.$apply();
		// 		//}
		// 		//else{

		// 		//}
		// });

		$scope.sendMsg = function(){
				sock.send("send:message",{
					from:$scope.senderUsername,
					to:$scope.senderDetails.username,
					message:$scope.msgInput,
					msgthreadId:$scope.senderDetails.msgthreadId,
					totalMsgCount:sock.friendList[$scope.senderDetails.username].totalMsgCount+1
				});
				$scope.receivePanel[$scope.senderDetails.username] = $scope.receivePanel[$scope.senderDetails.username] || [];
				$scope.receivePanel[$scope.senderDetails.username].push({message:$scope.msgInput,from:$scope.senderUsername});
				sock.msgList[$scope.senderDetails.username] = sock.msgList[$scope.senderDetails.username] || [];
				sock.msgList[$scope.senderDetails.username].push({message:$scope.msgInput,from:$scope.senderUsername});				
				$scope.msgInput = "";
				$scope.friendList.forEach(function(value){
					if(value.username == $scope.senderDetails.username){
						value.totalMsgCount++;
						value.lastReadmsg++;
					}
				});
				sock.friendList[$scope.senderDetails.username].totalMsgCount++;
				sock.friendList[$scope.senderDetails.username].lastReadmsg++;
				$timeout(function() {
					 angular.element(".chat-input-container").perfectScrollbar("update");
				});
				setChatscroller(true);
		};

		$scope.$on("$destroy",function(){
			sock.unbind("messageReceived");
			sock.unbind("loadMessages");
		});

	}];

	return controller;
});
