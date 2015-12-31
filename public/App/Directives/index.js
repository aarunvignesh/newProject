define(["./msgGrid","./profileContainer"],function(msgGrid,profileContainer){
	var directive=function(app){
		app.directive("msgGrid",msgGrid);
		app.directive("profileContainer",profileContainer);
	};
	return directive;
});