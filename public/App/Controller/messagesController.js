define(["angular"],function(){
	var controller=["$scope","$http","$mdSidenav","authenticate","$state",
	function($scope,$http,$mdSidenav,authenticate,$state){

		var userName = authenticate.getUsername();

		$scope.gotoProfile=function(){
			$state.go("profile",{username:userName.username});
		};

		$scope.openMsgSlideNav = function(){
			$mdSidenav("msgSlider").toggle();
		};
	}];
	
	return controller;
});