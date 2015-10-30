var User=require("./../lib/UpdateUser")();
var rndString=require('randomstring');
var email=require("./email");

module.exports={
	newRandomTextGenerate:function(user){
		user.randomEmailValidationText=rndString.generate({
			length:7,
			charset:'alphanumeric'
		});
		var obj=User.updateUser(user);
		obj.then(function(){
			var msg='<div style="font-size: 20px;font-family: cursive;"><span>Hi,</span>'
				+"<br/><span>Welcome to pingme!!!!We are happy to welcome in joining with us. Due to security reasons we are requesting this </span>"+
				'<span>security check.</span><br/><span> Your verification code is <b style="font-family: monospace;color: red;">'+user.randomEmailValidationText+ '</b></span><br/><span style="font-family: -webkit-body;font-size: 16px;>Thanks and Regards,<br/>Pingme Team</span></div>';
			email.sendEmail(user.email,"Verification Code",msg);
		});
	}
};