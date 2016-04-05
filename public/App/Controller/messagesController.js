define(["angular"],function(){
	var controller=["$scope","$http","$mdSidenav","visor","$state",
	function($scope,$http,$mdSidenav,visor,$state){

		var userName = visor.authData.username;

		$scope.senderDetails = {};

		$scope.userFirstname = visor.authData.name.toUpperCase();

		$scope.changeSenderdetails = function(senderInfo){
				$scope.senderDetails.username = senderInfo.username;
				$scope.senderDetails.name = senderInfo.name;
		};

		$scope.gotoProfile=function(){
			$state.go("profile",{username:userName});
		};

		$scope.openMsgSlideNav = function(){
			$mdSidenav("msgSlider").toggle();
		};
	}];

	return controller;
});
