define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService","$timeout","$animateCss","$location","$mdToast",
	function($scope,$http,authenticate,$state,chatService,$timeout,$animateCss,$location,$mdToast){
		$scope.username="";
		$scope.userUrl=$location.$$absUrl.split("verify")[0]+"profile/";
		$scope.$watch("username",function(value){
			value=value?value:"";
			$scope.userUrl=$location.$$absUrl.split("verify")[0]+"profile/"+value;
		});
		$scope.proceed = function(){
			if($scope.verifypin && $scope.username){
				$http.post("/api/rndtxtValidate",{
					id:authenticate.getUserId().id,
					verifyPin:$scope.verifypin 
				}).success(function(res){
					if(res.success){
						$state.go("profile");
					}
					else{
						$mdToast.show({
							template:prepareWarnToastMessage(res.err),
							position:"top right",
							hideDelay:2000
						});
					}
					
				}).error(function(){
					$mdToast.show({
							template:prepareWarnToastMessage("Facing New Issue will Recover Soon...."),
							position:"top right",
							hideDelay:2000
					});
				});
			}
		};
		$scope.$on("$viewContentLoaded",function(){
			$timeout(function() {
				$scope.showButtons=true;
			}, 1000);
		});
		 var prepareWarnToastMessage=function(msg){
			return '<md-toast class="animated bounceInDown" style="background:darkred;">'+msg+'</md-toast>'
		};
	}];
	return controller;
});