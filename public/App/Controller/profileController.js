define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService","establishSocket",
	function($scope,$http,authenticate,$state,chatService,establishSocket){
		$scope.$on("$viewContentLoaded",function(){
			chatService.joinMe(establishSocket);
		});
		$scope.logout=function(){
			var userStatus=authenticate.logoutUser();
			userStatus.then(
				function(){
					$state.go('welcome');
				},
				function(){
					
				}
				);
		};
		
	}];
	return controller;
});