define(["angular"],function(angular){
		var profileContainer=["$timeout",function($timeout){
			return {
			    restrict:"A",
			    link:function($scope,$elem,$attrs){
			    	
			    	$timeout(function() {
			    		
				    	angular.element($elem).css("position","relative").perfectScrollbar({
				    		suppressScrollX:true
				    	});	
			    	}, 100);

			    	
			    }
			}
		}];

		return profileContainer;
});