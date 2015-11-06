define(["./themeFactory","./toastFactory"],function(themeFactory,toastFactory){
	var indexFactory=function(app){
		app.factory("themeFactory",themeFactory);
		app.factory("toastFactory",toastFactory);
	};
	return indexFactory;
});