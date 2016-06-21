define(["angular"],function(angular){
	var controller = ["$scope","$http","sock",function($scope,$http,sock){
    $scope.friendList = [];
    $http.get("/api/getFriends").success(function(res) {
     	$scope.friendList = res.filter(function(val){
				return val.username != undefined;
			});
     	if(Object.keys(sock.friendList).length>0){
		     $scope.friendList = res.map(function(value){
		     	value.totalMsgCount = sock.friendList[value.username].totalMsgCount;
		     	value.lastReadmsg = sock.friendList[value.username].lastReadmsg;
		     	return value;
		     });
	 	}
    }).error(function(){

    });

    sock.listen("loadMessages",function(msgList){
    	$scope.friendList = $scope.friendList.map(function(value){
	     	value.totalMsgCount = sock.friendList[value.username].totalMsgCount;
	     	value.lastReadmsg = sock.friendList[value.username].lastReadmsg;
	     	return value;
     	});
     });
    
		var friendListCntr = angular.element("div[friendList]");
		$scope.lastupdateFriendlistScroll = 0;
		$scope.updateFriendlistScroll = function(index){
			if($scope.lastupdateFriendlistScroll != $scope.friendList.length){
					friendListCntr.perfectScrollbar("update");
					$scope.lastupdateFriendlistScroll = $scope.friendList.length;
			}
		};

		$scope.updatechatInputScroll = function(){
		    angular.element(".chat-input-container").perfectScrollbar("update");
		};

		$scope.$on('destroy',function(){
			sock.unbind("loadMessages");
		})
  }];
	return controller;
});
