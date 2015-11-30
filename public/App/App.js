
define(["angular","angularRoute","angularPrimus","angularMaterial","ngFx","./Controller/index","./Services/index","./Factory/index"],
	function(angular,angularRoute,angularPrimus,angularMaterial,ngFx,controller,services,factory){
	var app=angular.module("newApp",["ui.router","primus","ngMaterial","ngAnimate","ngFx"])

	.config(["$stateProvider","primusProvider","$mdThemingProvider","$urlRouterProvider",
		function($stateProvider,primusProvider,$mdThemingProvider,$urlRouterProvider){
		$stateProvider
		.state('welcome',
				{
					url:"/welcome",
					templateUrl:"/template/welcome",
					controller:"loginController"
				}
			)
		.state('verify',
				{
					url:"/verify",
					templateUrl:"/template/verify",
					controller:"verifyController"
				}
			)
		.state('profile',
				{
					url:"/profile/:username",
					templateUrl:"/template/diagonostics",
					controller:"profileController",
					resolve:{
						profileDetails:["$http","$stateParams","authenticate","$q",
						function($http,$stateParams,authenticate,$q){
							var defer=$q.defer();
							$http.post("api/userdetails/",{username:$stateParams.username}).success(function(res){
								defer.resolve(res);
							});
							return defer.promise;
						}]

					}
				}
			);
		primusProvider
		.setEndpoint(
			window.location.protocol+"//"
			+window.location.hostname
			+(window.location.port?(":"+window.location.port):(""))+"/primus"
			)
		.setOptions({
			reconnect: {
      				minDelay: 100,
      				maxDelay: 60000,
      				retries: Infinity
    				},
    		parser:"json"
		})
		.setDefaultMultiplex(false);
		$mdThemingProvider.theme('default');
		$urlRouterProvider.otherwise('/welcome');
	}])
	.run([
	"$state",
	"$log",
	"$location",
	"$rootScope",
	"$http",
	"authenticate",
	"themeFactory",
	
	function(
		$state,
		$log,
		$location,
		$rootScope,
		$http,
		authenticate,
		themeFactory
		){

		themeFactory.initTheme();
		$rootScope.$on("$viewContentLoaded",function(){
			angular.element(".animationBackground>li").height(angular.element(".animationBackground>li").width());
		});
		window.addEventListener("resize",function(){
			angular.element(".animationBackground>li").height(angular.element(".animationBackground>li").width());
		});
		$rootScope.$on("$stateChangeStart",function(event,next,current){
			$rootScope.showLoading=true;
			var auth=authenticate.isAuthenticatedUser();
			auth.then(
					function(user){
						$rootScope.loginPage=false;
						if(user.validationStatus){
							if(next.name!="profile"){
								$state.go('profile',{username:user.username});
							}
							else{
								return true;
							}
						}
						else{
							$state.go('verify');
						}
					},
					function(){
						$rootScope.loginPage=true;
						$state.go('welcome');
						return false;
					}
			);
		});


		$rootScope.$on("$stateChangeSuccess",function(event,next,current){
			$rootScope.showLoading=false;
		});
		
	}]);

	
	services(app);
	controller(app);
	factory(app);
	angular.bootstrap(angular.element("html"), ["newApp"]) 
	return app;
});