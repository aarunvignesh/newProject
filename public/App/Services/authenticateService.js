define(["angular"],function(){
	var service=["$http","$q","$timeout",function($http,$q,$timeout){
		var scope=this;
		this.userDetails={};
		this.authenticateUser=function(sendData){
			var deferUser=$q.defer();
			$http.post("/signIn",sendData).success(function(res){
				if(res.email){
					scope.userDetails.email=res.email;
					scope.userDetails.id=res.id;
					scope.userDetails.name=res.email.split("@")[0];
					scope.userDetails.validationStatus=res.validationStatus;
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

		this.getUserId=function(){
			if(scope.userDetails.id){
				return {id:scope.userDetails.id};
			}
			else{
				return {err:"::User Not Authenticated::"}
			}
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
				$http.get("/success").success(function(res){
				if(res.email){
					scope.userDetails.email=res.email;
					scope.userDetails.id=res.id;
					scope.userDetails.name=res.email.split("@")[0];
					scope.userDetails.validationStatus=res.validationStatus;
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
			}
			return deferUser.promise;
		};
		this.logoutUser=function(){
			var deferUser=$q.defer();
			$http.post("/logout",{id:scope.userDetails.id}).success(function(res){
				if(res.status){
					scope.userDetails={err:"User Logged Out"};
					deferUser.resolve();
				}
				else{
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