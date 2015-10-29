var User=require("./../lib/UpdateUser")();
var rndString=require('randomstring');

module.exports={
	newRandomTextGenerate:function(user){
		user.randomEmailValidationText=rndString.generate({
			length:7,
			charset:'alphanumeric'
		});
		var obj=User.updateUser(user);

	}
};