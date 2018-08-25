var mongoose=require('mongoose');
var bcrypt=require('bcrypt');

var userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

userSchema.methods={
    checkPassword: function(inputPass){
        return bcrypt.compareSync(inputPass,this.password);
    },

    hashPassword: function(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
    }
}



var User=mongoose.model('User',userSchema);

module.exports=User;