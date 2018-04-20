var express = require('express');
var router = express.Router();
var path = require('path');

//var ctrlMain = require('../controllers/main');
//var ctrlOthers = require('../controllers/others');

/* GET home page. */
//router.get('/', ctrlMain.index);


router.get('/', function(req, res ) {
  res.render('helloworld.jade', { title: 'Hello' });
  //res.type('text/plain');
  //res.send('Meadowlark Travel');
  //console.log("current dir "+__dirname);
  //res.render('home.handlebars');
});

router.get('/about', function(req, res ) {
  res.type('text/plain');
  res.send('About Meadowlark Travel');
});


module.exports = router;
