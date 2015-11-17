define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService","profileDetails",
	function($scope,$http,authenticate,$state,chatService,profileDetails){
		console.log(profileDetails);
		$scope.$on("$viewContentLoaded",function(){
			chatService.joinMe(authenticate.getUserId());
		});
		$scope.logout=function(){
			var userStatus=authenticate.logoutUser();
			userStatus.then(
				function(){
					$state.go('welcome');
				},
				function(){
					$state.go('welcome');
				}
				);
		};
		
	}];
	return controller;
});