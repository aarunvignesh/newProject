define(["angular"],function(){
	var service=["$http","$q","$timeout","$state","visor","$rootScope",function($http,$q,$timeout,$state,visor,$rootScope){
		var scope=this;
		this.userDetails={};
		this.visor_authenticator = function(){

			return $http.get("/success").success(function(res){
					if(res.email){
						scope.userDetails.email=res.email;
						scope.userDetails.id=res.id;
						scope.userDetails.name=res.email.split("@")[0];
						scope.userDetails.validationStatus=res.validationStatus;
						scope.userDetails.username= res.username;
						scope.userDetails.isProfilepic = res.isProfilepic;
						scope.userDetails.isCoverpic = res.isCoverpic;
						scope.userDetails.otherDetails = res.otherDetails;
						$rootScope.loginPage=false;
						return scope.userDetails;
					}
					else {
							$rootScope.loginPage=true;
							return null;
						}
					}).error(function(err){
						console.log("In visor authentication");
						return null;
					});

		};

		this.getcurrentuser_details = function(){
				return scope.userDetails;
		};

		this.authenticateUser=function(sendData){
			var deferUser=$q.defer();
			$http.post("/signIn",sendData).success(function(res){
				if(res.email){
					scope.userDetails.email = res.email;
					scope.userDetails.id = res.id;
					scope.userDetails.name = res.name;
					scope.userDetails.validationStatus = res.validationStatus;
					scope.userDetails.username = res.username;
					scope.userDetails.isProfilepic = res.isProfilepic;
					scope.userDetails.isCoverpic = res.isCoverpic;
					scope.userDetails.otherDetails=res.otherDetails;
					$rootScope.loginPage=false;
					console.log(res);
					visor.setAuthenticated(scope.userDetails);
					deferUser.resolve(scope.userDetails);
				}
				else if(res.err){
					this.userDetails=null;
					$http.get('/knowErrReason').success(function(res){
						if(res.length){
							deferUser.reject({err:res[0].err});
						}
					})
					.error(function(){
						deferUser.reject({err:"Facing new issue will be recovered soon"});
					});
				}
			}).error(function(err){
				this.userDetails=null;
				deferUser.reject({err:"Facing new issue will be recovered soon"});
			});
			return deferUser.promise;
		};

		this.joinUser=function(sendData){
			var deferUser=$q.defer();
			$http.post("/signUp",sendData).success(function(res){
				if(res.email){
					scope.userDetails.email=res.email;
					scope.userDetails.id=res.id;
					scope.userDetails.name=res.email.split("@")[0];
					scope.userDetails.validationStatus = res.validationStatus;
					scope.userDetails.username = res.username;
					scope.userDetails.isProfilepic = res.isProfilepic;
					scope.userDetails.isCoverpic = res.isCoverpic;
					$rootScope.loginPage=false;
					console.log(res);
					visor.setAuthenticated(scope.userDetails);
					deferUser.resolve(scope.userDetails);
				}
				else if(res.err){
					this.userDetails=null;
					$http.get('/knowErrReason').success(function(res){
						if(res.length){
							deferUser.reject({err:res[0].err});
						}
					})
					.error(function(){
						deferUser.reject({err:"Facing new issue will be recovered soon"});
					});
				}
			}).error(function(err){
				this.userDetails=null;
				deferUser.reject({err:"Facing new issue will be recovered soon"});
			});
			return deferUser.promise;
		};


		this.getUsername=function(){
			if(scope.userDetails.username){
				return {username:scope.userDetails.username};
			}
			else{
				$state.go('welcome');
				return {err:"::User Not Authenticated::"}
			}
		};


		this.getUserId=function(){
			if(scope.userDetails.id){
				return {id:scope.userDetails.id};
			}
			else{
				$state.go('welcome');
				return {err:"::User Not Authenticated::"}
			}
		};

		this.setUserValidationStatus = function (value){
			scope.userDetails.validationStatus=value;
		};

		this.setprofilePhoto = function (value){
			scope.userDetails.isProfilepic=value;
		};

		this.setcoverPhoto = function (value){
			scope.userDetails.isCoverpic=value;
		};

		this.refreshUserDetails=function(){
			var deferUser=$q.defer();

			$http.get("/success").success(function(res){
				if(res.email){
					scope.userDetails.email=res.email;
					scope.userDetails.id=res.id;
					scope.userDetails.name=res.email.split("@")[0];
					scope.userDetails.validationStatus=res.validationStatus;
					scope.userDetails.username= res.username;
					scope.userDetails.isProfilepic = res.isProfilepic;
					scope.userDetails.isCoverpic = res.isCoverpic;
					scope.userDetails.otherDetails = res.otherDetails;
					deferUser.resolve(scope.userDetails);
				}
				else if(res.err){
						this.userDetails=res;
						deferUser.reject();
					}
				}).error(function(err){
				this.userDetails=res;
				deferUser.reject();
			});

			return deferUser.promise;
		};

		this.isAuthenticatedUser=function(){
			var deferUser=$q.defer();
			if(scope.userDetails.email&&scope.userDetails.id&&scope.userDetails.name){
				$timeout(function() {
					deferUser.resolve(scope.userDetails);
				}, 10);
				return deferUser.promise;
			}
			else{
				return scope.refreshUserDetails();
			}

		};

		this.logoutUser=function(){
			var deferUser=$q.defer();
			$http.post("/logout",{id:scope.userDetails.id}).success(function(res){
				if(res.status){
					scope.userDetails={};
					visor.setAuthenticated(null);
					$rootScope.loginPage=true;
					deferUser.resolve();
				}
				else{
					scope.userDetails={};
					visor.setAuthenticated(null);
					$rootScope.loginPage=true;
					deferUser.reject();
				}
			}).error(function(){
				deferUser.reject();
			});
			return deferUser.promise;
		};
	}];
	return service;
});
