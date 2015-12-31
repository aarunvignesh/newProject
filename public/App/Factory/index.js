define(["./themeFactory","./toastFactory","./backgroundFactory"]
	,function(themeFactory,toastFactory,backgroundFactory){
	var indexFactory=function(app){
		app.factory("themeFactory",themeFactory);
		app.factory("toastFactory",toastFactory);
		app.factory("backgroundFactory",backgroundFactory);
	};
	return indexFactory;
});