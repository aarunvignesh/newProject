define(["angular"],function(angular){
	var controller=["$scope","$http","authenticate","$state","$timeout","$mdToast","$animate",
	function($scope,$http,authenticate,$state,$timeout,$mdToast,$animate){
		$scope.showSignIn=true;
		$scope.noFlipOnFirst=false;
		$scope.signInWrong=false;
		$scope.signUpWrong=false;
		$scope.submitSignInForm=function(){
			if($scope.userField && $scope.userField.trim()){

				if($scope.passField){

					var sendData={
						username:$scope.userField,
						password:$scope.passField
					};
					authenticate
					.authenticateUser(sendData)
					.then(function(user){
						$scope.noFlipOnFirst=false;
						$state.go("profile",{username:user.username});
					},
					function(err){
						$scope.userField="";
						$scope.passField="";
						$scope.signInWrong=true;
						$mdToast.show({
							template:prepareWarnToastMessage(err.err),
							position:"top right",
							hideDelay:2000
						});
					});
				}
				else{
					$mdToast.show({
						template:prepareToastMessage('Please enter your password'),
						position:"top right",
						hideDelay:2000
					});
				}
			}
			else{
				$mdToast.show({
						template:prepareToastMessage("Please enter your email id"),
						position:"top right",
						hideDelay:2000
					});
			}
		};
		$scope.backtoSignIn=function(){
			$scope.showSignIn=!$scope.showSignIn;
		};
		$scope.signUpCreation=function(){
			if ($scope.newEmail) {
				if($scope.newPassword && $scope.cnfPassword){
					if($scope.newPassword === $scope.cnfPassword){

						var sendData={
							username:$scope.newEmail,
							password:$scope.newPassword
						};
						authenticate
						.joinUser(sendData)
						.then(function(user){
							$scope.noFlipOnFirst=false;
							$state.go("verify");
						},
						function(err){
							$scope.newEmail="";
							$scope.newPassword="";
							$scope.cnfPassword="";
							$scope.signUpWrong=true;
							$mdToast.show({
								template:prepareWarnToastMessage(err.err),
								position:"top right",
								hideDelay:2000
							});
						});
					}
					else{
						$scope.newPassword = "";
						$scope.cnfPassword = "";
						$scope.signUpWrong=true;
						$mdToast.show({
							template:prepareWarnToastMessage("Passwords doesn't match please retype your password"),
							position:"top right",
							hideDelay:2000
						});
					}
				}
				else{
					$mdToast.show({
							template:prepareToastMessage("Please enter your password"),
							position:"top right",
							hideDelay:2000
					});
				}
			}
			else{
				$mdToast.show({
							template:prepareToastMessage("Please enter your email id"),
							position:"top right",
							hideDelay:2000
				});
			}
		};

		$scope.needSignUp=function(){
			$scope.showSignIn=!$scope.showSignIn;
			$scope.noFlipOnFirst=true;

		};

		//toast Generator
		var prepareToastMessage=function(msg){
			return '<md-toast class="animated bounceInDown">'+msg+'</md-toast>'
		};

		 var prepareWarnToastMessage=function(msg){
			return '<md-toast class="animated bounceInDown" style="background:darkred;">'+msg+'</md-toast>'
		};

		//Listeners
		$scope.$on("$viewContentLoaded",function(){

		});
		$scope.$watch("signInWrong",function(value){
			if(value){
				$timeout(function() {
					$scope.signInWrong=false;
				}, 1200);
			}
		});
		$scope.$watch("signUpWrong",function(value){
			if(value){
				$timeout(function() {
					$scope.signUpWrong=false;
				}, 1200);
			}
		});

	}];
	return controller;
});
