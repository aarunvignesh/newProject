
define(["angular"],function(angular){
		var directive=[function(){
			return {
			    restrict:"E",
			    replace:true,
			    templateUrl:"./App/Views/msgInput.html",
			    compile:function($scope,$elem,$attrs){

			    }
			}
		}];

		return directive;
});
