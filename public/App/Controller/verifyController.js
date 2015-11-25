define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService"
	,"$timeout","$animateCss","$location","toastFactory","$mdDialog",
	function($scope,$http,authenticate,$state,chatService,$timeout,$animateCss,$location,toastFactory,$mdDialog){

		$scope.username="";

		$scope.userUrl = $location.$$absUrl.split("verify")[0]+"profile/";

		$scope.showAvailBtn=false;

		$scope.enterFlag=true;

		$scope.userValidationerror=[
		{
			value:true,
			errText:"Please select ur username eith minimum of six characters"
		},
		{
			value:false,
			errText:$scope.userUrl
		},
		{
			value:false,
			errText:"Sorry Username contains less than six characters"
		},
		{
			value:false,
			errText:"Sorry Username unavailable.... Please try a different..."
		}
		];

		$scope.wrongPin=false;

		$scope.$watch("username",function(value){
			value=value?value:"";
			$scope.userUrl=$location.$$absUrl.split("verify")[0]+"profile/"+value;
			$scope.userValidationerror[1].errText=$scope.userUrl;
		});

		var setValidationError=function(index){
			for(var i=0;i<4;i++){
				$scope.userValidationerror[i].value=false;
			}
			if(index>-1){
				$scope.userValidationerror[index].value=true;
				$scope.showAvailBtn=false;
			}
			else{
				$scope.showAvailBtn=true;
			}
		};

		$scope.validateUsername=function(){
			if($scope.username.length>5){
				$http.get("/api/checkUserName/"+$scope.username).success(function(res){
					if(res.success){
							setValidationError(1);
							toastFactory.showToast("Username available...");
					}
					else{
						toastFactory.showWarnToast(res.err);
						if(res.code!=404){
							// If not server and connection Error
							//Error for username not available
							setValidationError(3);
						}
					}
				});
			}
			else{
				setValidationError(2);
			}
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

		$scope.showRegenDialog=function(ev){
			
		    var confirm = $mdDialog.confirm({
		    	title:"Regenerate Pin",
		    	textContent:"Didn't receive your verification email? Kindly check your spam folder too. Still haven't received your verification mail then continue by clicking regenerate.",
		    	ok:"Regenerate",
		    	cancel:"Cancel"
		    });
		    $mdDialog.show(confirm).then(function() {
		     regeneratePin();
		    }, function() {
		      
		    });
			
		};

		var regeneratePin=function(){
			var userId=authenticate.getUserId().id;
			if(userId){
				$http.get("/api/regenPin/"+userId).success(function(res){
					if(res.success){
							toastFactory.showToast(res.success);
					}
					else{
						toastFactory.showWarnToast(res.err);
					}
				});
			}
		};

		$scope.usernameKeyup = function() {
			if(!$scope.username){
				setValidationError(0);
			}
			else if($scope.username.length<6){
				setValidationError(2);
			}
			else if($scope.username.length>5){
				setValidationError(-1);
			}	
			
		};

		$scope.proceed = function(){
			if($scope.verifypin && $scope.username){
				$http.post("/api/rndtxtValidate",{
					id:authenticate.getUserId().id,
					verifyPin:$scope.verifypin ,
					username:$scope.username
				}).success(function(res){
					if(res.success){
						var defer=authenticate.refreshUserDetails();
						defer.then(function(){
							$state.go("profile",{username:$scope.username});
						},
						function(){
							toastFactory.showWarnToast("Facing new issue will recover soon");
						})
						
					}
					else{
						if(res.code==420){
							$scope.wrongPin=true;
							$timeout(function() {
								$scope.wrongPin=false;
								$scope.verifypin="";
								$scope.username="";
								setValidationError(0);
							}, 1000);
							toastFactory.showWarnToast(res.err);
						}
						else if(res.code!=404){
							setValidationError(3);
						}
					}
					
				}).error(function(){
					toastFactory.showWarnToast("Facing New Issue will Recover Soon....");
				});
			}
			else{
				if(!$scope.verifypin){
					toastFactory.showWarnToast("Please provide your verification PIN");
				}
				else{
					toastFactory.showWarnToast("Please provide username");
				}
			}
		};

		$scope.$on("$viewContentLoaded",function(){
			$timeout(function() {
				$scope.showButtons=true;
				$scope.enterFlag=false;
			}, 1000);
		});
		 
	}];
	return controller;
});