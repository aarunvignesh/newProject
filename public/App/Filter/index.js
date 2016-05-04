define(["./momentFilter","./nameFilter","./nameformatFilter","./sanitizeFilter"]
	,function(momentFilter,nameFilter,nameformatFilter,sanitizeFilter){
	var indexFactory=function(app){
		app.filter("momentFilter",momentFilter);
		app.filter("nameFilter",nameFilter);
		app.filter("nameformatFilter",nameformatFilter);
		app.filter("sanitizeFilter",sanitizeFilter);
	};
	return indexFactory;
});
