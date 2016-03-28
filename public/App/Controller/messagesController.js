define(["angular"],function(){
	var controller=["$scope","$http","$mdSidenav","visor","$state",
	function($scope,$http,$mdSidenav,visor,$state){

		var userName = visor.authData.username;

		$scope.userFirstname = visor.authData.name.toUpperCase();

		$scope.gotoProfile=function(){
			$state.go("profile",{username:userName});
		};

		$scope.openMsgSlideNav = function(){
			$mdSidenav("msgSlider").toggle();
		};
	}];

	return controller;
});
