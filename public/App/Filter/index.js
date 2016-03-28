define(["./momentFilter","./nameFilter","./nameformatFilter"]
	,function(momentFilter,nameFilter,nameformatFilter){
	var indexFactory=function(app){
		app.filter("momentFilter",momentFilter);
		app.filter("nameFilter",nameFilter);
		app.filter("nameformatFilter",nameformatFilter);
	};
	return indexFactory;
});
