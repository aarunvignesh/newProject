define(["angular"],function(angular){
		var profileContainer=["$timeout",function($timeout){
			return {
			    restrict:"C",
			    link:function($scope,$elem,$attrs){
			    	$scope.$on("$viewContentLoaded",function(){
			    		$timeout(function() {
			    		$elem.height($elem.width());	
			    	}, 0);
			    	angular.element(window).bind("resize",function(){
			    		$elem.height($elem.width());	
			    	});
			    });
			    	
			    		
			    }
			}
		}];

		return profileContainer;
});