define(["angular"],function(){
	var controller=["$scope","$q","$http","authenticate","$state","chatService","profileDetails"
	,"$timeout","$mdSidenav","$mdDialog","backgroundFactory","visor",

	function($scope,$q,$http,authenticate,$state,chatService,profileDetails,$timeout
		,$mdSidenav,$mdDialog,backgroundFactory,visor){
		$scope.adminUser=false;

		$scope.curr_username = visor.authData.username;
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
				$scope.profileUserDetails=visor.authData;

			}
			else{

				$scope.adminUser = false;

				$scope.profileUserDetails=profileDetails.user;
			}



		}
		else{

			if(adminName.username){

				$state.go('profile',{username:adminName.username});
			}
		};

		$scope.refreshProfileDetails=function(){
			$scope.profileDetailKeys = $scope.profileUserDetails.otherDetails?Object.keys($scope.profileUserDetails.otherDetails).filter(function(value){
				return ($scope.profileUserDetails.otherDetails[value].name)||($scope.profileUserDetails.otherDetails[value].type) || ($scope.profileUserDetails.otherDetails[value].date);}):[];
		}

		$scope.refreshProfileDetails();

		if($scope.profileUserDetails.isCoverpic || $scope.profileUserDetails.isCoverpicupdated){
			backgroundFactory.setCoverPhoto(angular.element("#mainProfilepanel"),$scope.profileUserDetails.username);
		}




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

		$scope.$on("$viewContentLoaded",function(){
				backgroundFactory.setProfilePhoto(angular.element("#profileImagepanel"),$scope.profileUserDetails.username);
		});


		//Search Methods

		$scope.search = {
			querySearch: function(text){
				if(text){
				 var defer = $q.defer();

				 $http.get('api/search/?name='+text).success(function(response){
					 defer.resolve(response);
				 }).error(function(err){
					 defer.reject();
				 });
				 return defer.promise;
			 	}
				else
					return [];
			},
			selectedItem : function(val){

				$state.go('profile',{username:val? val.username : $scope.curr_username});
			}
		};


	}];
	return controller;
});
