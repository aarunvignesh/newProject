var user=require("./../Schema/User");
var data={
	signIn:function(args,callback){
		
		user.findOne({email:args.email},function(err,res){
			if(err){
				callback(err,{err:"Sorry.. Some Error has Occured",code:404});
			}
			else if(!res){
				callback(null,{error:!res,err:"Sorry.. Invalid Username/Password",code:400})
			}
			else if(res.validPassword(args.password)){
				callback(null,res);
			}
			else{
				callback(null,{error:true,err:"Sorry.. Invalid Username/Password",code:420});
			}
		});
	},
	signUp:function(args,callback){
		user.findOne({email:args.email},function(err,res){
			if(err){
				callback(err,{err:"Sorry.. Some Error has Occured",code:404});
			}
			else if(res){
				callback(null,{err:"Sorry.. Username unavailable..",code:401});
			}
			else if(!res){
				var newUser=new user();
				newUser.email=args.email,
				newUser.password=args.password
				newUser.verifiedEmail=false;
				newUser.randomEmailValidationText="A1B2C3";
				newUser.save();
				callback(null,{success:newUser});
			}
		});
	},
	userById:function(args,callback){
	 user.findById(args.id,callback);	
	}
};
module.exports=data;