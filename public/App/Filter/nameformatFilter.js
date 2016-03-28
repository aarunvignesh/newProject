define(["angular"],function(angular){
	var Filter=[function(){
		return function(item,field){
      if(field.length){
          item = item.substr(0,5).trim() + "...";
      }
      return item;
    };
	}];
	return Filter;
});
