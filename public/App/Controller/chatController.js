define(["angular"],function(angular){
	var controller = ["$scope","$http",function($scope,$http){
    $scope.friendList = [];
    $http.get("/api/getFriends").success(function(res) {

     $scope.friendList = res.filter(function(val){
				return val.username != undefined;
			});
    }).error(function(){

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

		$scope.$on('destroy',function(){console.log("Destroyed");})
  }];
	return controller;
});
