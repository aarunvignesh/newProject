
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
		.state('profile',
				{
					url:"/profile",
					templateUrl:"/template/diagonostics",
					controller:"profileController",
					resolve:{
						establishSocket:["authenticate","$q","$timeout",function(authenticate,$q,$timeout){
							var deferred=$q.defer();
							var id=authenticate.getUserId();
							$timeout(
								function(){
									if(id.id)
									deferred.resolve(id);
									else
									deferred.reject();
								}
								);
							return deferred.promise;
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


		$rootScope.$on("$stateChangeStart",function(event,next,current){
			var auth=authenticate.isAuthenticatedUser();
			auth.then(
					function(){
						$state.go('profile');
					},
					function(){
						$state.go('welcome');
						return false;
					}
			);
		});
		
	}]);
	services(app);
	controller(app);
	factory(app);
	return app;
});