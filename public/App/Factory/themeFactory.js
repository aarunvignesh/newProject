define(["angular","less"],function(angular,less){
	var themeFactoryFn=[function(){
		var themeFactory={
			initTheme:function(){
				less.pageLoadFinished.then(function(){console.log("Finished");});
				var themesheet=angular.element('<link rel="stylesheet/less" href="./Styles/black/black.less"/>');
				themesheet.appendTo('head');
				less.sheets[0]=themesheet[0];
				less.refresh().then(function(){
					
					angular.element(".animationBackground>li").height(angular.element(".animationBackground>li").width());
				});
				less.refreshStyles();
			}
		};
		return themeFactory;
	}];
	return themeFactoryFn;
});