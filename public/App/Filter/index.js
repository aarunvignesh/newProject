define(["./momentFilter"]
	,function(momentFilter){
	var indexFactory=function(app){
		app.filter("momentFilter",momentFilter);
	};
	return indexFactory;
});
