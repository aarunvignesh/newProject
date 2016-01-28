define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService","profileDetails"
	,"$timeout","$mdSidenav","$mdDialog","adminDetails","backgroundFactory",
	
	function($scope,$http,authenticate,$state,chatService,profileDetails,$timeout
		,$mdSidenav,$mdDialog,adminDetails,backgroundFactory){
		$scope.adminUser=false;

		$scope.profileUserDetails={};

		var adminName = authenticate.getUsername();

		$scope.detailTemplate = {
			school:{
				title:"Studied at",
				icon:"book-open"
			},
			graduation:{
				title:"Graduated at",
				icon:"school"
			},
			work:{
				title:"Works at",
				icon:"worker"
			},
			born:{
				title:"Born at",
				icon:"baby"
			},
			hometown:{
				title:"Native Town",
				icon:"home"
			},
			livesAt:{
				title:"Currently Lives at",
				icon:"home-modern"
			},
			gender:{
				title:"Gender",
				icon:"gender-male-female"
			}
		};

		if(profileDetails.code == 200 || profileDetails.code == 202){
			if(profileDetails.code==200){

				$scope.adminUser = true;
				$scope.profileUserDetails=adminDetails;

			}
			else{
				
				$scope.adminUser = false;

				$scope.profileUserDetails=profileDetails.user;
			}
			$scope.profileDetailKeys = $scope.profileUserDetails.otherDetails?Object.keys($scope.profileUserDetails.otherDetails):[];
		}
		else{
			
			if(adminName.username){

				$state.go('profile',{username:adminName.username});
			}
		};



		$scope.profileUserDetails.otherDetails = {
			school:{
				detail:"TVS Matriculation Higher Secondary School"
			},
			graduation:{
				detail:"Kamaraj College of Engineering and Teachnology"
			},
			work:{
				detail:"Pearson English Business Solutions"
			},
			born:{
				detail:"22/08/1990"
			},
			hometown:{
				detail:"Madurai"
			},
			livesAt:{
				detail:"Chennai"
			},
			gender:{
				detail:"male"
			}
		};

		//$scope.profileDetailKeys = Object.keys($scope.profileUserDetails.otherDetails);

		if($scope.profileUserDetails.isCoverpic){
			backgroundFactory.setCoverPhoto(angular.element("#mainProfilepanel"),$scope.profileUserDetails.username);
		}
		
		backgroundFactory.setProfilePhoto(angular.element("#profileImagepanel"),$scope.profileUserDetails.username);


		$scope.setProfiledetailScroller = function(setter){
			if(setter)
			{
				
				angular.element(".profilescrollersetter").perfectScrollbar();
			}
			else{
				$timeout(function() {
					
					angular.element(".profilescrollersetter").perfectScrollbar("update");
				}, 10);
			}

		};

		$scope.setProfiledetailScroller(true);

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