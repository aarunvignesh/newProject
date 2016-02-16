define(["angular","moment"],function(angular,moment){
	var momentFilter=[function(){
		return function(text){
      console.log(moment(text)._d);
      return moment(text).format("MM/DD/YYYY");
    };
	}];
	return momentFilter;
});
