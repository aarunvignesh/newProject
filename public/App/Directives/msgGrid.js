
define(["angular"],function(angular){
		var directive=[function(){
			return {
			    restrict:"E",
			    replace:true,
			    templateUrl:"./App/Views/msgGrid.html",
					controller:"chatController",
			    compile:function($scope,$elem,$attrs){

			    }
			}
		}];

		return directive;
});
