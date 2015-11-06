define(["angular"],function(){
	var controller=["$scope","$http","authenticate","$state","chatService","$timeout","$animateCss","$location","toastFactory",
	function($scope,$http,authenticate,$state,chatService,$timeout,$animateCss,$location,toastFactory){

		$scope.username="";

		$scope.userUrl = $location.$$absUrl.split("verify")[0]+"profile/";

		$scope.showUrl = true;

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
						toastFactory.showWarnToast(res.err);
					}
					
				}).error(function(){
					toastFactory.showWarnToast("Facing New Issue will Recover Soon....");
				});
			}
			else{
				if(!scope.verifypin){
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
			}, 1000);
		});
		 
	}];
	return controller;
});