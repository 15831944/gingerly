var passport=require('passport');
var mongoose=require('mongoose');
var User = mongoose.model('User');
var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  console.log("enter api regsiter ");
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message" : "All fields are required"
    });
    return;
  }
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  console.log("set user password");
  user.setPassword(req.body.password);
  console.log("save user into db");
  user.save(function(err) {
      var token;
      if (err) {
        console.log("save user error " + err);
        sendJSONresponse(res, 404, err);
      }else {
        console.log("use saved, create token with JWT and send to browser");
        token=user.generateJwt();
        sendJSONresponse(res, 200, {
          "token": token
        });
      }
  });
};

module.exports.login = function(req, res) {

  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message" : "All fields are required"
    });
    return;
  }
  console.log("enter login func");
  passport.authenticate('local', function(err, user, info){
    console.log("passport authenticate .");
    var token;
    if(err) {
      sendJSONresponse(res, 404, err);
    }
    if (user) {
      console.log("valid user ,send token to browser");
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};
