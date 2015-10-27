define(["./themeFactory"],function(themeFactory){
	var indexFactory=function(app){
		app.factory("themeFactory",themeFactory);
	};
	return indexFactory;
});