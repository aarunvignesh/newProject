define(["angular"],function(){
	var controller=["$scope","$mdDialog","visor","$timeout","backgroundFactory","$http","toastFactory",
	function($scope,$mdDialog,visor,$timeout,backgroundFactory,$http,toastFactory){

		//Close dialog
		$scope.close = function(){
			$mdDialog.hide();
		};

		$scope.friendList = [];
	    $http.get("/api/getFriends").success(function(res) {
	     	$scope.friendList = res.filter(function(val){
					return val.username != undefined;
				});
	    }).error(function(){

	    });
		
		

		$scope.isperfectScrollbarattached = false;

		$scope.updateFriendlistScroll = function(index){

			var friendListCntr = angular.element("md-dialog-content[friendlistdialog]");
			if($scope.lastupdateFriendlistScroll != $scope.friendList.length){
				//$timeout(function() {
					if(!$scope.isperfectScrollbarattached){

						$scope.isperfectScrollbarattached = true;
						friendListCntr.perfectScrollbar();
					}
					else{
						friendListCntr.perfectScrollbar("update");
					}
					
					
				//}, 500);
					
			}
		};

	}];

	return controller;
});
