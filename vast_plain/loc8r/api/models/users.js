var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  hash: String,
  salt: String
});
userSchema.methods.setPassword = function(password) {
  console.log(" to set user password with salt and hash");
  this.salt = crypto.randomBytes(16).toString('hex');
  console.log("crypt string, then hash");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  console.log("leaving setPassword");
}

userSchema.methods.validPassword = function(password) {
  console.log("enter validPassword method");
  var hash = crypto.pbkdf2sync(password,  this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}
userSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    eamil: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime()/1000),
  }, process.env.JWT_SECRET);
};

mongoose.model("User", userSchema);
