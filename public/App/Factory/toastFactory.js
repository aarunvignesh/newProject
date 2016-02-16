define(["angular","less"],function(angular,less){
	var toastFactoryFn=["$mdToast",function($mdToast){


		//toast Generator
		var prepareToastMessage=function(msg){
			return '<md-toast class="animated bounceInDown">'+msg+'</md-toast>'
		};

		 var prepareWarnToastMessage=function(msg){
			return '<md-toast class="animated bounceInDown custom-toast-warning">'+msg+'</md-toast>'
		};

		var toastFactory={
			showWarnToast:function(msg){
				$mdToast.show({
							template:prepareWarnToastMessage(msg),
							position:"top right",
							hideDelay:5000
				});
			},
			showToast:function(msg){
				$mdToast.show({
							template:prepareToastMessage(msg),
							position:"top right",
							hideDelay:5000
				});
			}
		};
		return toastFactory;
	}];
	return toastFactoryFn;
});
