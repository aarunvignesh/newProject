define(["angular"],function(angular){
	var backgroundFactoryFn=[function(){
		var backgroundFactory={
			setCoverPhoto:function(elem,username){

				angular.element(elem).css({
					backgroundImage:"url(./api/photos/"+username+"/cover?"+Date.now()+")",
					backgroundSize:"cover",
					backgroundPosition:"50% 50%"
				});
			},
			setProfilePhoto:function(elem,username){

				angular.element(elem).css({
					backgroundImage:"url(./api/photos/"+username+"/profile?"+Date.now()+")",
					backgroundSize:"cover",
					backgroundPosition:"50% 50%",
					backgroundRepeat:"no-repeat"
				});

			}
		};
		return backgroundFactory;
	}];
	return backgroundFactoryFn;
});
