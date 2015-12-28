define(["./msgGrid"],function(msgGrid){
	var directive=function(app){
		app.directive("msgGrid",msgGrid);
	};
	return directive;
});