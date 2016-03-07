define(["angular"],function(){
	var controller=["$scope","$mdDialog","visor","$timeout","backgroundFactory","$http","toastFactory",
	function($scope,$mdDialog,visor,$timeout,backgroundFactory,$http,toastFactory){

		$scope.userName = visor.authData.username;

		$scope.userdetails = {};
		//$scope.userdetails = visor.authData;

		copier($scope.userdetails,visor.authData);

		function copier(value1,value2){
				Object.keys(value2).forEach(function(val){
					if(typeof value2[val] == "object")
					{
							value1[val]={};
							copier(value1[val],value2[val]);
					}
					else{
							value1[val]=value2[val];
					}

				});
		};

		//Profile photo upload flags
		$scope.profileFlags = {
			showText:true,
			showLoading:false,
			loadingValue:0
		};

		$scope.saveUserDetails = function() {
				$http.post("/api/user/details",$scope.userdetails).success(function(){
						toastFactory.showToast("Saved Successfully...");
						copier(visor.authData,$scope.userdetails);
						$scope.close();
				}).error(function(){
						toastFactory.showWarnToast("Facing New issue will recover soon..");
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
				visor.authData.isProfilepic = true;
				if(visor.authData.username==$scope.$$prevSibling.profileUserDetails.username)
				backgroundFactory.setProfilePhoto(angular.element("#profileImagepanel"),$scope.userName);
			}
			else if(frame=='cover'){

				$scope.coverFlags.loadingValue = 100;
				$scope.coverFlags.showLoading = false;
				visor.authData.isCoverpic = true;
				if(visor.authData.username==$scope.$$prevSibling.profileUserDetails.username)
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
