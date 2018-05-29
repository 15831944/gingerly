var fortune = require('../js/fortune.js');
exports.home = function(req, res) {
    res.render('meadowlark/meadowlark_home.handlebars');
};

exports.about = function(req, res) {
    console.log("enter main about");
    res.render('meadowlark/about.handlebars',{
        fortune: fortune.getFortune(),
    });
};

exports.newsletter = function(req, res) {
    res.render('meadowlark/newsletter.handlebars', {csrf: "CSRF tokens goes here"});
};


var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
function NewsletterSignup(){
}
NewsletterSignup.prototype.save = function(cb){
	cb();
};


exports.newsletterProcessPost = function (req, res) {
    console.log("enter newsleter post");
    var name = req.body.name || '';
    var email = req.body.email || '';
    if (!email.match(VALID_EMAIL_REGEX)) {
      req.session.flash = {
        type: 'danger',
        intro: 'validation error!',
        message: ' The email address was not valid.'
      };
      return res.redirect(303, '/meadowlark/newsletter/archive');
    }
  
    new NewsletterSignup({name: name, email:email}).save(function(err){
      if(err) {
        if(req.xhr) return res.json({error: 'database error.'});
        req.session.flash = {
          type: 'danger',
          intro: 'Database Error',
          message: 'There was a database error, please try again'
        };
        return res.redirect(303, '/meadowlark/newsletter/archive');
      }
      if (req.xhr) return res.json({success: true});
      req.session.flash = {
        type: 'success',
        intro: 'THank you.',
        message: 'You have now signed up for the newsletter'
  
      }
      return res.redirect(303, '/meadowlark/newsletter/archive');
    });
  };
  
exports.newsletterArchive = function(req, res) {
      res.render('meadowlark/newsletter/archive.handlebars');
  };


exports.genericThankYou = function(req, res) {
     res.render('meadowlark/thank-you.handlebars');
}