var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var user = mongoose.model('User');

passport.use(new LocalStrategy({
	usernameField: 'email'
  },
  function(username, password, done){
    console.log("inside passport use func ");
    User.findOne({email: username}, function(err, user){
       if(err) {return done(err); }
       if(!user) {
	        return done(null, false, {
	           message: 'Incorrect username.'
	         });
       }
       console.log("found user " + username);
       if (!user.validPassword(password)) {
	        return done(null, false, {
	           message: 'Incorrect password.'
	        });
       }
       console.log("password validated");
       return done(null, user);
    });

  }
  ));
