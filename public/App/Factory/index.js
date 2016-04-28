define(["./themeFactory","./toastFactory","./backgroundFactory","./notificationFactory"]
	,function(themeFactory,toastFactory,backgroundFactory,notificationFactory){
	var indexFactory=function(app){
		app.factory("themeFactory",themeFactory);
		app.factory("toastFactory",toastFactory);
		app.factory("backgroundFactory",backgroundFactory);
		app.factory("notificationFactory",notificationFactory);
	};
	return indexFactory;
});