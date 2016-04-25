define(["angular"],function(){
	var controller=["$scope","$q","$http","authenticate","$state","profileDetails"
	,"$timeout","$mdSidenav","$mdDialog","backgroundFactory","visor","toastFactory",

	function($scope,$q,$http,authenticate,$state,profileDetails,$timeout
		,$mdSidenav,$mdDialog,backgroundFactory,visor,toastFactory){
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

		$scope.refreshAdminprofiledetails = function(){
			if(profileDetails.code==200){

				$scope.adminUser = true;
				$scope.profileUserDetails=visor.authData;
				$scope.refreshProfileDetails();
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
				console.log(adminName.username);
				$state.go('profile',{username:adminName.username});
			}
		};

		$scope.refreshProfileDetails=function(){
			$scope.profileDetailKeys = $scope.profileUserDetails.otherDetails?Object.keys($scope.profileUserDetails.otherDetails).filter(function(value){
				return ($scope.profileUserDetails.otherDetails[value].name)||($scope.profileUserDetails.otherDetails[value].type) || ($scope.profileUserDetails.otherDetails[value].date);}):[];
		}

		$scope.refreshProfileDetails();

		//if($scope.profileUserDetails.isCoverpic || $scope.profileUserDetails.isCoverpicupdated){
			backgroundFactory.setCoverPhoto(angular.element("#mainProfilepanel"),$scope.profileUserDetails.username);
		//}

		var filterRelation = function(username){
			var Friends = visor.authData.friendList.filter(function(val,index){
				return val.username == username;
			});
			
			if(Friends.length){
				return "FRIEND"
			}

			var wantstobeFriend = visor.authData.friendRequestrecievequeue.filter(function(val,index){
				return val.username == username;
			});
			
			if(wantstobeFriend.length){
				return "WANTS_TO_BE_FRIEND_WITH_ME";
			}

			var iwanttobeFriend = visor.authData.friendRequestsentqueue.filter(function(val,index){
				return val.username == username;
			});

			if(iwanttobeFriend.length){
				return "I_WANT_TO_BE_FRIEND"
			}
		};

		var findFriend = function(){
			$scope.myFriend = false;
			$scope.friendRequested = false;
			$scope.friendRequestsent = false;
			switch(filterRelation($scope.profileUserDetails.username)){
				case "FRIEND":
					$scope.myFriend = true;
					break;
				case "WANTS_TO_BE_FRIEND_WITH_ME":
					$scope.friendRequested = true;
					break;
				case "I_WANT_TO_BE_FRIEND":
					$scope.friendRequestsent = true;			
					break;
				default:
					$scope.myFriend = false;
					$scope.friendRequested = false;
					$scope.friendRequestsent = false;	
			}
		};

		if(!$scope.adminUser){
			findFriend();
		}

		$scope.setProfiledetailScroller = function(setter){
			if(setter)
			{
				$timeout(function() {
					angular.element(".profilescrollersetter").perfectScrollbar();
				});
			}
			else{
				$timeout(function() {

					angular.element(".profilescrollersetter").perfectScrollbar("update");
				}, 10);
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

		$scope.$on("$viewContentLoaded",function(){
				backgroundFactory.setProfilePhoto(angular.element("#profileImagepanel"),$scope.profileUserDetails.username);
				$scope.setProfiledetailScroller(true);
		});


		$scope.sendfriendRequest = function(){
			var requestObj = {
				requestor: {},
				requested:{}
			};
			requestObj.requestor.username 	=  	visor.authData.username;
			requestObj.requestor.id 		= 	visor.authData.id;
			requestObj.requested.username 	= 	$scope.profileUserDetails.username;	
			requestObj.requested.id 		= 	$scope.profileUserDetails.id;	
			$http.post("/api/friendRequest",requestObj).success(function(res){
				if(res.code == 200){
					toastFactory.showToast(res.success);
					visor.authData.friendRequestsentqueue.push(requestObj.requested);
					findFriend();
				}
				else{
					toastFactory.showWarnToast(res.err);
				}
			}).error(function(){
				toastFactory.showWarnToast("Facing new issue will recover soon...");
			});
		};

		$scope.acceptfriendRequest = function(){
			var obj = {
				acceptor:{},
				requestor:{}
			};
			obj.acceptor.username  	=  	visor.authData.username;
			obj.acceptor.id 		=	visor.authData.id;
			obj.requestor.username 	=	$scope.profileUserDetails.username;
			obj.requestor.id 		=	$scope.profileUserDetails.id;

			$http.post("/api/acceptRequest",obj).success(function(res){
				if(res.code == 200){
					toastFactory.showToast(res.success);
					visor.authData.friendList.push(obj.requestor);
					findFriend();
				}
				else{
					toastFactory.showWarnToast(res.err);
				}
			}).error(function(){
				toastFactory.showWarnToast("Facing new issue will recover soon...");
			});

		};

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
