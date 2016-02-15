define(["angular"],function(){
	var controller=["$scope","$mdDialog","authenticate","$timeout","backgroundFactory","$http",
	function($scope,$mdDialog,authenticate,$timeout,backgroundFactory,$http){

		$scope.userName = authenticate.getUsername().username;

		$scope.userdetails = authenticate.getcurrentuser_details();

		console.log($scope.userdetails);
		//Profile photo upload flags
		$scope.profileFlags = {
			showText:true,
			showLoading:false,
			loadingValue:0
		};

		$scope.saveUserDetails = function() {
				$http.post("/api/user/details",$scope.userdetails).success(function(){
						console.log("Update");
				}).error(function(){
						console.log("Error");
				});
		};

		//Date picker maxdate
		$scope.todayDate = new Date();

		//Cover photo upload flags
		$scope.coverFlags = {
			showText:true,
			showLoading:false,
			loadingValue:0
		};

		//Close dialog
		$scope.close = function(){
			$mdDialog.hide();
		};

		//Event for file added
		$scope.fileAdded = function(frame,file){
			if((file.size/1000)>2100){
				return false;
			}
			else {
				return true;
			}
		};

		//Check file if image is added
		$scope.checkFile = function(flow,frame){
			if(flow.files.length>0){
				if(flow.files[0].file.type=="image/jpeg"){
					if(frame=="profile"){
						$scope.profileFlags.showText = false;
					}
					else if(frame=="cover"){
						$scope.coverFlags.showText = false;
					}
					flow.upload();
				}
				else{
					if(frame=="profile"){
						$scope.profileFlags.showText = true;
					}
					else if(frame=="cover"){
						$scope.coverFlags.showText = true;
					}
					flow.cancel();
				}
			}
		};

		$scope.fileUploadStarted= function(frame){
			if(frame=='profile'){

			$scope.profileFlags.showLoading = true;
			$scope.profileFlags.loadingValue = 0;
			}
			else if(frame == 'cover'){
				$scope.coverFlags.showLoading = true;
				$scope.coverFlags.loadingValue = 0;
			}
		};

		$scope.fileUploadComplete= function(frame){
			if(frame=='profile'){

				$scope.profileFlags.loadingValue = 100;
				$scope.profileFlags.showLoading = false;
				authenticate.setprofilePhoto(true);
				backgroundFactory.setProfilePhoto(angular.element("#profileImagepanel"),$scope.userName);
			}
			else if(frame=='cover'){

				$scope.coverFlags.loadingValue = 100;
				$scope.coverFlags.showLoading = false;
				authenticate.setcoverPhoto(true);
				backgroundFactory.setCoverPhoto(angular.element("#mainProfilepanel"),$scope.userName);
			}
		};

		$scope.uploadprofileProgress = function(flow,frame){
			if(frame=='profile'){

				$scope.profileFlags.loadingValue = (flow.files[0].progress()*100);
			}
			else if(frame=='cover'){

				$scope.coverFlags.loadingValue = (flow.files[0].progress()*100);
			}
		};

		$scope.uploadCover = function(){
			angular.element("#uploadCoverphoto").click();
		};

		$scope.uploadProfile = function(){
			angular.element("#uploadProfilephoto").click();
		};



	}];

	return controller;
});
