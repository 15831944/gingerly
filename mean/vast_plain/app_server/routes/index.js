var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');


/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/helloworld', function(req, res ) {
  res.render('helloworld', { title: 'Hello' });
});

module.exports = router;
