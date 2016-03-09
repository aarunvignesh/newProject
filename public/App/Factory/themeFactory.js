define(["angular","less"],function(angular,less){
	var themeFactoryFn=["$timeout",function($timeout){
		var themeFactory={
			initTheme:function(){
				less.pageLoadFinished.then(function(){console.log("Finished");});
				var themesheet=angular.element('<link rel="stylesheet/less" href="./Styles/black/black.less"/>');
				themesheet.appendTo('head');
				less.sheets[0]=themesheet[0];
				less.refresh();
				less.refreshStyles();
				// less.refresh().then(function(){
				// 	$timeout(function() {
				//
				// 		angular.element(".animationBackground>li").height(angular.element(".animationBackground>li").width());
				// 	}, 700);
				// });
			}
		};
		return themeFactory;
	}];
	return themeFactoryFn;
});
