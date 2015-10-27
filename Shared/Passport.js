/**
 * Created by EMD-Sys7 on 4/23/15.
 */
var User=require("./../lib/User")();
var LocalStrategy=require('passport-local').Strategy;
module.exports=function(passport){

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.userById({id:id}, function(err, user) {
         done(err, user);
    });
});
passport.use('local-signup', new LocalStrategy(
    {
        passReqToCallback : true
    },
    function(req,username, password, done) {
        User.signUp({email:username,password:password},function(err,response){
            if(err){
              return done(response.error,req.flash("message",response));  
            }
            if(response.err){
              return done(null,false,req.flash("message",response));  
            }
            else{
               
                return done(null, response.success);
            }
        });

    }));
    passport.use('local-login', new LocalStrategy(
        {
            passReqToCallback : true
        },
        function(req,username, password, done) {
            User.signIn({email:username,password:password},function(err,response){
            if(err){
              return done(response.error,req.flash("message",response));  
            }
            else if(response.error){
               return done(null,false,req.flash("message",response));  
            }
                
            return done(null, response);
            
        });

    }));
}