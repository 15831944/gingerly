var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlLocations=require('../loc8r/controllers/locations');
var ctrlOthers = require('../controllers/others');


/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/helloworld', function(req, res ) {
  res.render('helloworld', { title: 'Hello' });
});

//loc8r routers
router.get('/loc8r', ctrlLocations.homelist);
router.get('/loc8r/location', ctrlLocations.locationInfo);
router.get('/loc8r/location/review/new', ctrlLocations.addReview);
router.get('/loc8r/about', ctrlLocations.about);


router.get('/about', ctrlOthers.about);

module.exports = router;
