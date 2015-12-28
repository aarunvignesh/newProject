define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService","profileDetails"
	,"$timeout","$mdSidenav","$mdDialog",
	
	function($scope,$http,authenticate,$state,chatService,profileDetails,$timeout,$mdSidenav,$mdDialog){
		$scope.adminUser=false;

		if(profileDetails.code == 200 || profileDetails == 202){
			if(profileDetails.code==200){
				$scope.adminUser = true;
			}
			else{
				$scope.adminUser = false;
			}
		}
		else{
			var name = authenticate.getUsername();
			if(name.username){

				$state.go('profile',{username:name.username});
			}
		};
		
		

		$scope.openSettings=function(){

			$mdDialog.show({
				controller: "settingsController",
		      	templateUrl: './App/Views/settingsDialog.html',
		      	parent: angular.element(document.body),
				clickOutsideToClose:true,
				height:500,
				width:500,
				openFrom:{
					top:window.innerHeight,
					left:window.innerWidth/2,
					width:30,
					height:30
				},
				closeTo:{
					bottom:0
				}
			})
		};

		$scope.gotoMessages = function(){
			$state.go("messages");
		};

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

		$scope.openSlideNav = function(){
			$mdSidenav("mainSlider").toggle();
		};
		
	}];
	return controller;
});