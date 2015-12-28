
define(["angular","angularRoute","angularPrimus","angularMaterial","ngFx","ngFlow","./Controller/index","./Services/index","./Factory/index","./Directives/index"],
	function(angular,angularRoute,angularPrimus,angularMaterial,ngFx,ngFlow,controller,services,factory,directives){
	var app=angular.module("newApp",["ui.router","primus","ngMaterial","ngAnimate","ngFx","flow"])

	.config(["$stateProvider","primusProvider","$mdThemingProvider","$urlRouterProvider","$mdIconProvider",
		function($stateProvider,primusProvider,$mdThemingProvider,$urlRouterProvider,$mdIconProvider){
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
		.state('messages',
				{
					url:"/messages",
					templateUrl:"/template/messages",
					controller:"messagesController"
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
							$http.post("api/userdetails/",{username:$stateParams.username})
							.success(function(res){
								defer.resolve(res);
							});
							return defer.promise;
						}],
						adminDetails:["authenticate","$q",function(authenticate,$q){
							var defer = $q.defer();
							authenticate.isAuthenticatedUser().then(function(user){
								defer.resolve(user);
							},
							function(){
								defer.reject();
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
		$mdIconProvider.defaultIconSet('./Styles/mdi.svg')
	}])
	.run([
	"$state",
	"$log",
	"$location",
	"$rootScope",
	"$http",
	"authenticate",
	"themeFactory",
	"chatService",
	
	function(
		$state,
		$log,
		$location,
		$rootScope,
		$http,
		authenticate,
		themeFactory,
		chatService
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
							chatService.joinMe(authenticate.getUserId());
							var allowedRoutes=["profile","messages"];
							if(allowedRoutes.indexOf(next.name)<0){
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

		$rootScope.$on("$stateChangeError",function(event,next,current){
			$rootScope.showLoading=false;
		});

		$rootScope.$on("$stateChangeSuccess",function(event,next,current){
			$rootScope.showLoading=false;
		});
		
	}]);

	
	services(app);
	controller(app);
	factory(app);
	directives(app);
	angular.bootstrap(angular.element("html"), ["newApp"]) 
	return app;
});