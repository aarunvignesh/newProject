define(["angular"],function(angular){
	var Filter=[function(){
		return function(item,field){
      var arr = [];
      if(field.name && field.name.trim() !=""){
        arr = item.filter(function(val){
          return val.name.indexOf(field.name) == 0;
        })
      }
      else{
        arr = item
      }
      return arr;
    };
	}];
	return Filter;
});
