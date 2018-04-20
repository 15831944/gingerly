var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/helloworld', function(req, res ) {
  res.render('helloworld.jade', { title: 'Hello' });
});

router.get('/about', ctrlOthers.about);

module.exports = router;
