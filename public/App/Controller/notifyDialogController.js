define(["angular"],function(angular){
	var controller = ["$scope","$mdDialog","visor","$timeout","backgroundFactory","$http","$state",
	function($scope,$mdDialog,visor,$timeout,backgroundFactory,$http,$state){

		//Close dialog
		$scope.close = function(){
			$mdDialog.hide();
		};

		$http.get("/api/requests")
	    .success(function(res) {
	     	$scope.friendRequestlist = res.filter(function(val){
					return val.username != undefined;
			});
	    }).error(function(){
	    	$scope.friendRequestlist = [];
	    });

	    $scope.gotoProfile = function(username){
	    	if(username){

	    		$state.go('profile',{username:username});
	    		$mdDialog.hide();
	    	}
	    };

  }];
	return controller;
});
