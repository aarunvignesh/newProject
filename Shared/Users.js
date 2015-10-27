/**
 * Created by EMD-Sys7 on 4/23/15.
 */
var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var userSchema=mongoose.Schema({
    username:'String',
    password:'String'
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    //return password;
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
    //return password;
};
module.exports=mongoose.model('User',userSchema);