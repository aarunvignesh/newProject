define(["angular"],function(){
	var controller=["$scope","$http","$mdSidenav","visor","$state","sock",
	function($scope,$http,$mdSidenav,visor,$state,sock){

		$scope.senderUsername = visor.authData.username;

		$scope.senderDetails = {};

		$scope.receivePanel = {};

		$scope.userFirstname = visor.authData.name.toUpperCase();

		$scope.changeSenderdetails = function(senderInfo){
				$scope.senderDetails.username = senderInfo.username;
				$scope.senderDetails.name = senderInfo.name;
		};

		$scope.gotoProfile=function(){
			$state.go("profile",{username:$scope.senderUsername});
		};

		$scope.openMsgSlideNav = function(){
			$mdSidenav("msgSlider").toggle();
		};

		sock.receive("receive:message",function(msg){
				//if(msg.from == $scope.senderDetails.username){
						$scope.receivePanel[msg.from] = $scope.receivePanel[msg.from] || [];
						$scope.receivePanel[msg.from].push(msg);
						$scope.$apply();
				//}
				//else{

				//}
		});

		$scope.sendMsg = function(){
				sock.send("send:message",{
					to:$scope.senderDetails.username,
					message:$scope.msgInput
				});
				$scope.receivePanel[$scope.senderDetails.username] = $scope.receivePanel[$scope.senderDetails.username] || [];
				$scope.receivePanel[$scope.senderDetails.username].push({message:$scope.msgInput,from:$scope.senderUsername});
				$scope.msgInput = "";
		};

	}];

	return controller;
});
