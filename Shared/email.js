var nodemailer = require('nodemailer');
var emailAuthDetails=require('./../config')("emailAuthenDetails");

// Sending mail to the user
  var transporter = nodemailer.createTransport({
  service: 'Gmail',
      auth: {
          user:  emailAuthDetails.username,
          pass: emailAuthDetails.password
      }
  });

  module.exports={
   sendEmail:function(to,subject,message){
    transporter.sendMail({
      from: "Pingme Support<"+emailAuthDetails.username+">",
      to: to,
      subject: subject,
      //text: 'Shiva',
      html: message
      }, 
      function(error, response){
      if(error){
          console.log('Failed in sending mail');
          console.dir({success: false, existing: false, sendError: true});
          console.dir(error);
      }else{
          console.log('Successful in sedning email');
          console.dir({success: true, existing: false, sendError: false});
          console.dir(response);
      }
    });
  }
 };