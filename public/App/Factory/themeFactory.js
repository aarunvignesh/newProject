define(["angular","less"],function(angular,less){
	var themeFactoryFn=[function(){
		var themeFactory={
			initTheme:function(){
				var themesheet=angular.element('<link rel="stylesheet/less" href="./Styles/black/black.less"/>');
				themesheet.appendTo('head');
				less.sheets[0]=themesheet[0];
				less.refresh();
				less.refreshStyles();
			}
		};
		return themeFactory;
	}];
	return themeFactoryFn;
});