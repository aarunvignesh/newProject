define("Controller/loginController",["angular"],function(e){var t=["$scope","$http","authenticate","$state","$timeout","$mdToast","$animate",function(e,t,n,r,i,s,o){e.showSignIn=!0,e.noFlipOnFirst=!1,e.signInWrong=!1,e.signUpWrong=!1,e.submitSignInForm=function(){if(e.userField&&e.userField.trim())if(e.passField){var t={username:e.userField,password:e.passField};n.authenticateUser(t).then(function(t){e.noFlipOnFirst=!1,r.go("profile",{username:t.username})},function(t){e.userField="",e.passField="",e.signInWrong=!0,s.show({template:a(t.err),position:"top right",hideDelay:2e3})})}else s.show({template:u("Please enter your password"),position:"top right",hideDelay:2e3});else s.show({template:u("Please enter your email id"),position:"top right",hideDelay:2e3})},e.backtoSignIn=function(){e.showSignIn=!e.showSignIn},e.signUpCreation=function(){if(e.newEmail)if(e.newPassword&&e.cnfPassword)if(e.newPassword===e.cnfPassword){var t={username:e.newEmail,password:e.newPassword};n.joinUser(t).then(function(t){e.noFlipOnFirst=!1,r.go("verify")},function(t){e.newEmail="",e.newPassword="",e.cnfPassword="",e.signUpWrong=!0,s.show({template:a(t.err),position:"top right",hideDelay:2e3})})}else e.newPassword="",e.cnfPassword="",e.signUpWrong=!0,s.show({template:a("Passwords doesn't match please retype your password"),position:"top right",hideDelay:2e3});else s.show({template:u("Please enter your password"),position:"top right",hideDelay:2e3});else s.show({template:u("Please enter your email id"),position:"top right",hideDelay:2e3})},e.needSignUp=function(){e.showSignIn=!e.showSignIn,e.noFlipOnFirst=!0};var u=function(e){return'<md-toast class="animated bounceInDown">'+e+"</md-toast>"},a=function(e){return'<md-toast class="animated bounceInDown" style="background:darkred;">'+e+"</md-toast>"};e.$on("$viewContentLoaded",function(){}),e.$watch("signInWrong",function(t){t&&i(function(){e.signInWrong=!1},1200)}),e.$watch("signUpWrong",function(t){t&&i(function(){e.signUpWrong=!1},1200)})}];return t}),define("Controller/profileController",["angular"],function(){var e=["$scope","$q","$http","authenticate","$state","chatService","profileDetails","$timeout","$mdSidenav","$mdDialog","backgroundFactory","visor",function(e,t,n,r,i,s,o,u,a,f,l,c){e.adminUser=!1,e.curr_username=c.authData.username,e.profileUserDetails={};var h=r.getUsername();e.detailTemplate={school:{title:"Studied at",icon:"book-open"},graduation:{title:"Graduated at",icon:"school"},work:{title:"Works at",icon:"worker"},born:{title:"Born at",icon:"baby"},hometown:{title:"Native Town",icon:"home"},livesAt:{title:"Currently Lives at",icon:"home-modern"},gender:{title:"Gender",icon:"gender-male-female"}},o.code==200||o.code==202?o.code==200?(e.adminUser=!0,e.profileUserDetails=c.authData):(e.adminUser=!1,e.profileUserDetails=o.user):h.username&&i.go("profile",{username:h.username}),e.refreshProfileDetails=function(){e.profileDetailKeys=e.profileUserDetails.otherDetails?Object.keys(e.profileUserDetails.otherDetails).filter(function(t){return e.profileUserDetails.otherDetails[t].name||e.profileUserDetails.otherDetails[t].type||e.profileUserDetails.otherDetails[t].date}):[]},e.refreshProfileDetails(),(e.profileUserDetails.isCoverpic||e.profileUserDetails.isCoverpicupdated)&&l.setCoverPhoto(angular.element("#mainProfilepanel"),e.profileUserDetails.username),e.setProfiledetailScroller=function(e){e?angular.element(".profilescrollersetter").perfectScrollbar():u(function(){angular.element(".profilescrollersetter").perfectScrollbar("update")},10)},e.setProfiledetailScroller(!0),e.openSettings=function(){f.show({controller:"settingsController",templateUrl:"./App/Views/settingsDialog.html",parent:angular.element(document.body),clickOutsideToClose:!0,height:500,width:500,openFrom:{top:window.innerHeight,left:window.innerWidth/2,width:30,height:30},closeTo:{bottom:0}})},e.gotoMessages=function(){i.go("messages")},e.logout=function(){var e=r.logoutUser();e.then(function(){i.go("welcome")},function(){i.go("welcome")})},e.openSlideNav=function(){a("mainSlider").toggle()},e.$on("$viewContentLoaded",function(){l.setProfilePhoto(angular.element("#profileImagepanel"),e.profileUserDetails.username)}),e.search={querySearch:function(e){if(e){var r=t.defer();return n.get("api/search/?name="+e).success(function(e){r.resolve(e)}).error(function(e){r.reject()}),r.promise}return[]},selectedItem:function(t){i.go("profile",{username:t?t.username:e.curr_username})}}}];return e}),define("Controller/verifyController",["angular"],function(){var e=["$scope","$http","authenticate","$state","chatService","$timeout","$animateCss","$location","toastFactory","$mdDialog",function(e,t,n,r,i,s,o,u,a,f){e.username="",e.userUrl=u.$$absUrl.split("verify")[0]+"profile/",e.showAvailBtn=!1,e.enterFlag=!0,e.userValidationerror=[{value:!0,errText:"Please select your username with minimum of six characters"},{value:!1,errText:e.userUrl},{value:!1,errText:"Sorry Username contains less than six characters"},{value:!1,errText:"Sorry Username unavailable.... Please try a different..."}],e.wrongPin=!1,e.$watch("username",function(t){t=t?t:"",e.userUrl=u.$$absUrl.split("verify")[0]+"profile/"+t,e.userValidationerror[1].errText=e.userUrl});var l=function(t){for(var n=0;n<4;n++)e.userValidationerror[n].value=!1;t>-1?(e.userValidationerror[t].value=!0,e.showAvailBtn=!1):e.showAvailBtn=!0};e.validateUsername=function(){e.username.length>5?t.get("/api/checkUserName/"+e.username).success(function(e){e.success?(l(1),a.showToast("Username available...")):(a.showWarnToast(e.err),e.code!=404&&l(3))}):l(2)},e.logout=function(){var e=n.logoutUser();e.then(function(){r.go("welcome")},function(){r.go("welcome")})},e.showRegenDialog=function(e){var t=f.confirm({title:"Regenerate Pin",textContent:"Didn't receive your verification email? Kindly check your spam folder too. Still haven't received your verification mail then continue by clicking regenerate.",ok:"Regenerate",cancel:"Cancel"});f.show(t).then(function(){c()},function(){})};var c=function(){var e=n.getUserId().id;e&&t.get("/api/regenPin/"+e).success(function(e){e.success?a.showToast(e.success):a.showWarnToast(e.err)})};e.usernameKeyup=function(){e.username?e.username.length<6?l(2):e.username.length>5&&l(-1):l(0)},e.proceed=function(){e.verifypin&&e.username?t.post("/api/rndtxtValidate",{id:n.getUserId().id,verifyPin:e.verifypin,username:e.username}).success(function(t){if(t.success){var i=n.refreshUserDetails();i.then(function(){r.go("profile",{username:e.username})},function(){a.showWarnToast("Facing new issue will recover soon")})}else t.code==420?(e.wrongPin=!0,s(function(){e.wrongPin=!1,e.verifypin="",e.username="",l(0)},1e3),a.showWarnToast(t.err)):t.code!=404&&l(3)}).error(function(){a.showWarnToast("Facing New Issue will Recover Soon....")}):e.verifypin?a.showWarnToast("Please provide username"):a.showWarnToast("Please provide your verification PIN")},e.$on("$viewContentLoaded",function(){s(function(){e.showButtons=!0,e.enterFlag=!1},1e3)})}];return e}),define("Controller/messagesController",["angular"],function(){var e=["$scope","$http","$mdSidenav","authenticate","$state",function(e,t,n,r,i){var s=r.getUsername();e.gotoProfile=function(){i.go("profile",{username:s.username})},e.openMsgSlideNav=function(){n("msgSlider").toggle()}}];return e}),define("Controller/settingsController",["angular"],function(){var e=["$scope","$mdDialog","visor","$timeout","backgroundFactory","$http","toastFactory",function(e,t,n,r,i,s,o){function u(e,t){Object.keys(t).forEach(function(n){typeof t[n]=="object"?(e[n]={},u(e[n],t[n])):e[n]=t[n]})}e.userName=n.authData.username,e.userdetails={},u(e.userdetails,n.authData),e.profileFlags={showText:!0,showLoading:!1,loadingValue:0},e.saveUserDetails=function(){s.post("/api/user/details",e.userdetails).success(function(){o.showToast("Saved Successfully..."),u(n.authData,e.userdetails),e.close()}).error(function(){o.showWarnToast("Facing New issue will recover soon..")})},e.todayDate=new Date,e.coverFlags={showText:!0,showLoading:!1,loadingValue:0},e.close=function(){t.hide()},e.fileAdded=function(e,t){return t.size/1e3>2100?!1:!0},e.checkFile=function(t,n){t.files.length>0&&(t.files[0].file.type=="image/jpeg"?(n=="profile"?e.profileFlags.showText=!1:n=="cover"&&(e.coverFlags.showText=!1),t.upload()):(n=="profile"?e.profileFlags.showText=!0:n=="cover"&&(e.coverFlags.showText=!0),t.cancel()))},e.fileUploadStarted=function(t){t=="profile"?(e.profileFlags.showLoading=!0,e.profileFlags.loadingValue=0):t=="cover"&&(e.coverFlags.showLoading=!0,e.coverFlags.loadingValue=0)},e.fileUploadComplete=function(t){t=="profile"?(e.profileFlags.loadingValue=100,e.profileFlags.showLoading=!1,n.authData.isProfilepic=!0,n.authData.username==e.$$prevSibling.profileUserDetails.username&&i.setProfilePhoto(angular.element("#profileImagepanel"),e.userName)):t=="cover"&&(e.coverFlags.loadingValue=100,e.coverFlags.showLoading=!1,n.authData.isCoverpic=!0,n.authData.username==e.$$prevSibling.profileUserDetails.username&&i.setCoverPhoto(angular.element("#mainProfilepanel"),e.userName))},e.uploadprofileProgress=function(t,n){n=="profile"?e.profileFlags.loadingValue=t.files[0].progress()*100:n=="cover"&&(e.coverFlags.loadingValue=t.files[0].progress()*100)},e.uploadCover=function(){angular.element("#uploadCoverphoto").click()},e.uploadProfile=function(){angular.element("#uploadProfilephoto").click()}}];return e}),define("Controller/index",["./loginController","./profileController","./verifyController","./messagesController","./settingsController"],function(e,t,n,r,i){var s=function(s){s.controller("loginController",e),s.controller("profileController",t),s.controller("verifyController",n),s.controller("messagesController",r),s.controller("settingsController",i)};return s}),define("Services/authenticateService",["angular"],function(){var e=["$http","$q","$timeout","$state","visor","$rootScope",function(e,t,n,r,i,s){var o=this;this.userDetails={},this.visor_authenticator=function(){return e.get("/success").success(function(e){return e.email?(o.userDetails.email=e.email,o.userDetails.id=e.id,o.userDetails.name=e.name,o.userDetails.validationStatus=e.validationStatus,o.userDetails.username=e.username,o.userDetails.isProfilepic=e.isProfilepic,o.userDetails.isCoverpic=e.isCoverpic,o.userDetails.otherDetails=e.otherDetails,o.userDetails.otherDetails.born&&(o.userDetails.otherDetails.born.date=o.userDetails.otherDetails.born.date?new Date(o.userDetails.otherDetails.born.date):undefined),s.loginPage=!1,o.userDetails):(s.loginPage=!0,null)}).error(function(e){return console.log("In visor authentication"),null})},this.getcurrentuser_details=function(){return o.userDetails},this.authenticateUser=function(n){var r=t.defer();return e.post("/signIn",n).success(function(t){t.email?(o.userDetails.email=t.email,o.userDetails.id=t.id,o.userDetails.name=t.name,o.userDetails.validationStatus=t.validationStatus,o.userDetails.username=t.username,o.userDetails.isProfilepic=t.isProfilepic,o.userDetails.isCoverpic=t.isCoverpic,o.userDetails.otherDetails=t.otherDetails,o.userDetails.otherDetails.born&&(o.userDetails.otherDetails.born.date=o.userDetails.otherDetails.born.date?new Date(o.userDetails.otherDetails.born.date):undefined),s.loginPage=!1,i.setAuthenticated(o.userDetails),r.resolve(o.userDetails)):t.err&&(this.userDetails=null,e.get("/knowErrReason").success(function(e){e.length&&r.reject({err:e[0].err})}).error(function(){r.reject({err:"Facing new issue will be recovered soon"})}))}).error(function(e){this.userDetails=null,r.reject({err:"Facing new issue will be recovered soon"})}),r.promise},this.joinUser=function(n){var r=t.defer();return e.post("/signUp",n).success(function(t){t.email?(o.userDetails.email=t.email,o.userDetails.id=t.id,o.userDetails.name=t.email.split("@")[0],o.userDetails.validationStatus=t.validationStatus,o.userDetails.username=t.username,o.userDetails.isProfilepic=t.isProfilepic,o.userDetails.isCoverpic=t.isCoverpic,s.loginPage=!1,i.setAuthenticated(o.userDetails),r.resolve(o.userDetails)):t.err&&(this.userDetails=null,e.get("/knowErrReason").success(function(e){e.length&&r.reject({err:e[0].err})}).error(function(){r.reject({err:"Facing new issue will be recovered soon"})}))}).error(function(e){this.userDetails=null,r.reject({err:"Facing new issue will be recovered soon"})}),r.promise},this.getUsername=function(){return o.userDetails.username?{username:o.userDetails.username}:(r.go("welcome"),{err:"::User Not Authenticated::"})},this.getUserId=function(){return o.userDetails.id?{id:o.userDetails.id}:(r.go("welcome"),{err:"::User Not Authenticated::"})},this.setUserValidationStatus=function(e){o.userDetails.validationStatus=e},this.setprofilePhoto=function(e){o.userDetails.isProfilepic=e},this.setcoverPhoto=function(e){o.userDetails.isCoverpic=e},this.refreshUserDetails=function(){var n=t.defer();return e.get("/success").success(function(e){e.email?(o.userDetails.email=e.email,o.userDetails.id=e.id,o.userDetails.name=e.email.split("@")[0],o.userDetails.validationStatus=e.validationStatus,o.userDetails.username=e.username,o.userDetails.isProfilepic=e.isProfilepic,o.userDetails.isCoverpic=e.isCoverpic,o.userDetails.otherDetails=e.otherDetails,n.resolve(o.userDetails)):e.err&&(this.userDetails=e,n.reject())}).error(function(e){this.userDetails=res,n.reject()}),n.promise},this.isAuthenticatedUser=function(){var e=t.defer();return o.userDetails.email&&o.userDetails.id&&o.userDetails.name?(n(function(){e.resolve(o.userDetails)},10),e.promise):o.refreshUserDetails()},this.logoutUser=function(){var n=t.defer();return e.post("/logout",{id:o.userDetails.id}).success(function(e){e.status?(o.userDetails={},i.setAuthenticated(null),s.loginPage=!0,n.resolve()):(o.userDetails={},i.setAuthenticated(null),s.loginPage=!0,n.reject())}).error(function(){n.reject()}),n.promise}}];return e}),define("Services/chatService",["angular","primus"],function(){var e=["authenticate","primus","$rootScope",function(e,t,n){this.joinMe=function(e){n.connectionEstablished||(t.send("initialHandshake",e),n.connectionEstablished=!0)}}];return e}),define("Services/index",["./authenticateService","./chatService"],function(e,t){var n=function(n){n.service("authenticate",e),n.service("chatService",t)};return n}),define("Factory/themeFactory",["angular","less"],function(e,t){var n=["$timeout",function(n){var r={initTheme:function(){t.pageLoadFinished.then(function(){console.log("Finished")});var r=e.element('<link rel="stylesheet/less" href="./Styles/black/black.less"/>');r.appendTo("head"),t.sheets[0]=r[0],t.refresh().then(function(){n(function(){e.element(".animationBackground>li").height(e.element(".animationBackground>li").width())},700)}),t.refreshStyles()}};return r}];return n}),define("Factory/toastFactory",["angular","less"],function(e,t){var n=["$mdToast",function(e){var t=function(e){return'<md-toast class="animated bounceInDown">'+e+"</md-toast>"},n=function(e){return'<md-toast class="animated bounceInDown custom-toast-warning">'+e+"</md-toast>"},r={showWarnToast:function(t){e.show({template:n(t),position:"top right",hideDelay:5e3})},showToast:function(n){e.show({template:t(n),position:"top right",hideDelay:5e3})}};return r}];return n}),define("Factory/backgroundFactory",["angular"],function(e){var t=[function(){var t={setCoverPhoto:function(t,n){e.element(t).css({backgroundImage:"url(./api/photos/"+n+"/cover?"+Date.now()+")",backgroundSize:"cover",backgroundPosition:"50% 50%"})},setProfilePhoto:function(t,n){e.element(t).css({backgroundImage:"url(./api/photos/"+n+"/profile?"+Date.now()+")",backgroundSize:"cover",backgroundPosition:"50% 50%"})}};return t}];return t}),define("Factory/index",["./themeFactory","./toastFactory","./backgroundFactory"],function(e,t,n){var r=function(r){r.factory("themeFactory",e),r.factory("toastFactory",t),r.factory("backgroundFactory",n)};return r}),define("Directives/msgGrid",["angular"],function(e){var t=[function(){return{restrict:"E",replace:!0,templateUrl:"./App/Views/msgGrid.html",compile:function(e,t,n){console.log("<<<Scope>>>"),console.log(e),console.log("<<<Scope>>>"),console.log(t),console.log("<<<Scope>>>"),console.log(n)}}}];return t}),define("Directives/profileContainer",["angular"],function(e){var t=["$timeout",function(t){return{restrict:"C",link:function(t,n,r){t.$on("$viewContentLoaded",function(){n.height(n.width())}),e.element(window).bind("resize",function(){n.height(n.width())})}}}];return t}),define("Directives/scrollerDirective",["angular"],function(e){var t=["$timeout",function(t){return{restrict:"A",link:function(n,r,i){t(function(){e.element(r).css("position","relative").perfectScrollbar({suppressScrollX:!0})},100)}}}];return t}),define("Directives/index",["./msgGrid","./profileContainer","./scrollerDirective"],function(e,t,n){var r=function(r){r.directive("msgGrid",e),r.directive("profileContainer",t),r.directive("perfectscroller",n)};return r}),define("Filter/momentFilter",["angular","moment"],function(e,t){var n=[function(){return function(e){return t(e).format("MM/DD/YYYY")}}];return n}),define("Filter/index",["./momentFilter"],function(e){var t=function(t){t.filter("momentFilter",e)};return t}),define("App",["angular","angularRoute","angularMessages","angularPrimus","angularMaterial","ngFx","ngFlow","visor","./Controller/index","./Services/index","./Factory/index","./Directives/index","./Filter/index"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){var p=e.module("newApp",["ui.router","ngMessages","primus","ngMaterial","ngAnimate","ngFx","flow","visor"]).config(["$stateProvider","primusProvider","$mdThemingProvider","$urlRouterProvider","$mdIconProvider","visorProvider",function(e,t,n,r,i,s,o,u){s.loginRoute="/welcome",s.notAuthorizedRoute="/welcome",s.doOnNotAuthorized=["visor","$state","authenticate",function(e,t,n){e.authData?e.authData.validationStatus?t.go("profile",{username:n.getUsername().username}):t.go("verify"):t.go("welcome")}],s.shouldAddNext=!1,s.authenticate=["authenticate",function(e){var t=e.visor_authenticator();return t.then(function(e){return e.data!=""?e.data:null})}],e.state("welcome",{url:"/welcome",templateUrl:"/template/welcome",controller:"loginController",restrict:function(e){return!e}}).state("verify",{url:"/verify",templateUrl:"/template/verify",controller:"verifyController",restrict:function(e){return e&&!e.validationStatus}}).state("messages",{url:"/messages",templateUrl:"/template/messages",controller:"messagesController",restrict:function(e){return e&&e.validationStatus}}).state("profile",{url:"/profile/:username",templateUrl:"/template/diagonostics",controller:"profileController",restrict:function(e){return e&&e.validationStatus},resolve:{profileDetails:["$http","$stateParams","authenticate","$q",function(e,t,n,r){var i=r.defer();return e.post("api/userdetails/",{username:t.username}).success(function(e){e.code!=404?i.resolve(e):i.reject()}),i.promise}]}}),t.setEndpoint(window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")+"/primus").setOptions({reconnect:{minDelay:100,maxDelay:6e4,retries:Infinity},parser:"json"}).setDefaultMultiplex(!1),n.theme("default"),r.otherwise("/welcome"),i.defaultIconSet("./Styles/mdi.svg")}]).run(["$state","$log","$location","$rootScope","$http","authenticate","themeFactory","chatService","visor","$timeout",function(t,n,r,i,s,o,u,a,f,l){i.loginPage=!0,u.initTheme(),i.$on("$viewContentLoaded",function(){e.element(".animationBackground>li").height(e.element(".animationBackground>li").width())}),window.addEventListener("resize",function(){e.element(".animationBackground>li").height(e.element(".animationBackground>li").width())})}]);return h(p),f(p),a(p),l(p),c(p),e.bootstrap(e.element("html"),["newApp"]),p});