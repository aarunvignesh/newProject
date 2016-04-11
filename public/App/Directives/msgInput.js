
define(["angular"],function(angular){
		var directive=[function(){
			return {
			    restrict:"E",
			    replace:true,
			    templateUrl:"./App/Views/msgInput.html",
					require:"?ngModel",
			    link:function($scope,$elem,$attrs,ngModel){

						if(ngModel){
							ngModel.$render = function(){
								$elem.html(ngModel.$viewValue || "");
							};
							$elem.on('blur keyup change keypress',function() {
								$scope.$apply(read);
							});
							function read(){
								var html = $elem.html();
								ngModel.$setViewValue(html);
							};
							read();
						}
			  }
			};
		}];

		return directive;
});
