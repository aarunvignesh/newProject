var user=require("./../Schema/User");
var deferProvider=require("q");
var data={
	updateUser:function(args){
		var defer=deferProvider.defer();
		user.update({_id:args._id},args,function(err,user){
			if(err){
				defer.reject({err:"Error Occured"});
			}
			else{
				defer.resolve(user);
			}
		});
		return defer.promise;
	}
};
return data;