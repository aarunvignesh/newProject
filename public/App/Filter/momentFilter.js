define(["angular","moment"],function(angular,moment){
	var momentFilter=[function(){
		return function(text){
      return moment(text).format("MM/DD/YYYY");
    };
	}];
	return momentFilter;
});
