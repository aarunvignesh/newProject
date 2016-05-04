var user=require("./../Schema/User");
var deferProvider=require("q");
var data={
	updateAlluser:function(match,args){
		var defer=deferProvider.defer();
		user.update(match,args,{multi:true},function(err,user){
			if(err){
				defer.reject({err:"Error Occured"});
			}
			else{
        console.log(user);
				defer.resolve(user);
			}
		});
		return defer.promise;
	}
};
module.exports=data;
