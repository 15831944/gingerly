var express=require('express');
var passport=require('passport');

var router=express.Router();
router.route('/login').post(passport.authenticate('local'), function(req, res) {
  res.json(req.user);
});

router.post('logout', function(req, res){
  req.logout();
  res.send('200', 'Successfully logout out');
});

module.exports=router;
