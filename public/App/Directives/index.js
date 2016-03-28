define(["./msgGrid","./profileContainer","./scrollerDirective","./msgInput"],function(msgGrid,profileContainer,scrollerDirective,msgInput){
	var directive=function(app){
		app.directive("msgGrid",msgGrid);
		app.directive("profileContainer",profileContainer);
		app.directive("perfectscroller",scrollerDirective);
		app.directive("msgInput",msgInput);
	};
	return directive;
});
