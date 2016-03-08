define(["angular"],function(angular){
		var profileContainer=["$timeout",function($timeout){
			return {
			    restrict:"C",
			    link:function($scope,$elem,$attrs){
			    	$scope.$on("$viewContentLoaded",function(){
							$elem.height($elem.width());
						});
			    	angular.element(window).bind("resize",function(){
			    		$elem.height($elem.width());
			    	});
					}
			}
		}];

		return profileContainer;
});
