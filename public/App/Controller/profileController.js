define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService","profileDetails","$timeout","$mdSidenav",
	function($scope,$http,authenticate,$state,chatService,profileDetails,$timeout,$mdSidenav){
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
		$scope.hideNavigator = function(){
			$timeout(function(){
				$scope.hideSliderNav = !$scope.hideSliderNav;
			},400);
		};
		$scope.openSlideNav = function(){
			$mdSidenav("mainSlider").toggle();
		};
		
	}];
	return controller;
});