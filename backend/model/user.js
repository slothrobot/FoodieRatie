const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        maxLength:50
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        minLength:6
    },
    role:{
        type:Number,
        default: 0
    },
    token:{
        type:String,
    },
    tokenExp:{
        type:Number,
    }

})

//before saving, encrypt users' password first
const saltRounds = 10;
userSchema.pre('save', function(next){
    var user = this;
//go through the encryption only when the password is modified
    if(user.isModified('password')){

      bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
      });
    }else{
        next()
    }
});
//to define a method for my schema and use it in server.js 
userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user);
    });
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token, 'secret', function(err, decode){
        user.findOne({'_id':decode, 'token':token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        });
    });
}

const User = mongoose.model('User', userSchema);

module.exports = {User}