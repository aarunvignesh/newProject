
define(["angular"],function(angular){
		var directive=[function(){
			return {
			    restrict:"E",
			    replace:true,
			    templateUrl:"./App/Views/msgGrid.html",
			    compile:function($scope,$elem,$attrs){
			    	console.log("<<<Scope>>>");
			    	console.log($scope);
			    	console.log("<<<Scope>>>");
			    	console.log($elem);
			    	console.log("<<<Scope>>>");
			    	console.log($attrs);
			    }
			}
		}];

		return directive;
});