define(["./msgGrid","./profileContainer","./scrollerDirective"],function(msgGrid,profileContainer,scrollerDirective){
	var directive=function(app){
		app.directive("msgGrid",msgGrid);
		app.directive("profileContainer",profileContainer);
		app.directive("perfectscroller",scrollerDirective);
	};
	return directive;
});