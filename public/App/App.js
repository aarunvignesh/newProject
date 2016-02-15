
define(["angular","angularRoute","angularMessages","angularPrimus","angularMaterial","ngFx","ngFlow","visor","./Controller/index","./Services/index","./Factory/index","./Directives/index"],
	function(angular,angularRoute,angularMessages,angularPrimus,angularMaterial,ngFx,ngFlow,visor,controller,services,factory,directives){
	var app=angular.module("newApp",["ui.router","ngMessages","primus","ngMaterial","ngAnimate","ngFx","flow","visor"])

	.config(["$stateProvider","primusProvider","$mdThemingProvider","$urlRouterProvider","$mdIconProvider","visorProvider",
		function($stateProvider,primusProvider,$mdThemingProvider
			,$urlRouterProvider,$mdIconProvider,visorProvider,authenticatedOnly,notForAuthenticated){

		visorProvider.loginRoute="/welcome";

		visorProvider.notAuthorizedRoute="/welcome";

		visorProvider.doOnNotAuthorized = ["visor","$state","authenticate",function(visor,$state,authenticate){
			console.log("not authorized");
			if(visor.authData){
				if(visor.authData.validationStatus){
					$state.go('profile',{username:authenticate.getUsername().username});
				}
				else{
					$state.go('verify');
				}
			}
			else {
				$state.go('welcome');
			}
		}];

		visorProvider.shouldAddNext = false;

		visorProvider.authenticate = ["authenticate",function(authenticate){
					var a = authenticate.visor_authenticator();
          return a.then(function(res){
						return res.data != "" ? res.data : null;});
  		}];

		$stateProvider
		.state('welcome',
				{
					url:"/welcome",
					templateUrl:"/template/welcome",
					controller:"loginController",
					restrict:function(auth){
						return !auth;
					}
				}
			)
		.state('verify',
				{
					url:"/verify",
					templateUrl:"/template/verify",
					controller:"verifyController",
					restrict:function(auth){
						return auth && !auth.validationStatus;
					}
				}
			)
		.state('messages',
				{
					url:"/messages",
					templateUrl:"/template/messages",
					controller:"messagesController",
					restrict:function(auth){
						return auth && auth.validationStatus;
					}
				}
			)
		.state('profile',
				{
					url:"/profile/:username",
					templateUrl:"/template/diagonostics",
					controller:"profileController",
					restrict:function(auth){
						return auth && auth.validationStatus;
					},
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
	"visor",
	function(
		$state,
		$log,
		$location,
		$rootScope,
		$http,
		authenticate,
		themeFactory,
		chatService,
		visor
		){

		$rootScope.loginPage=true;

		themeFactory.initTheme();
		$rootScope.$on("$viewContentLoaded",function(){
			angular.element(".animationBackground>li").height(angular.element(".animationBackground>li").width());
		});
		window.addEventListener("resize",function(){
			angular.element(".animationBackground>li").height(angular.element(".animationBackground>li").width());
		});

	}]);


	services(app);
	controller(app);
	factory(app);
	directives(app);
	angular.bootstrap(angular.element("html"), ["newApp"])
	return app;
});
