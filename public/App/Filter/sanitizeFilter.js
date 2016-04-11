define(["angular","moment"],function(angular,moment){
	var momentFilter=["$sce",function($sce){
		return function(text){
      return $sce.trustAsHtml(text);
    };
	}];
	return momentFilter;
});
