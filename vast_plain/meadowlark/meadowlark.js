var express = require('express');
var router = express.Router();


var weather = require('./js/weather.js');
var cartValidation = require('./js/cartValidation.js');

var Vacation = require('./model/vacation.js');
var VacationInSeasonListener = require('./model/vacationInSeasonListener.js');

var mongoose = require('mongoose');

// LOCAL DB
var dbURI = 'mongodb://localhost/meadowlark';

//LIVE DB
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://heroku_wgjnlstq:xibm145@ds133331.mlab.com:33331/heroku_wgjnlstq';
}


mongoose.connect(dbURI);
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error ' + err);
});
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected' );
});

Vacation.find(function (err, vacations) {
  console.log("vacations length " + vacations.length)
  if (vacations.length) return;

  new Vacation({
    name: 'Hood River Day Trip',
    slug: 'hood-river-day-trip',
    category: 'Day Trip',
    sku: 'HR199',
    description: 'Spend a day sailing on the Columbia and ' + 
        'enjoying craft beers in Hood River!',
    priceInCents: 9995,
    tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
    inSeason: true,
    maximumGuests: 16,
    available: true,
    packagesSold: 0,
}).save();

new Vacation({
    name: 'Oregon Coast Getaway',
    slug: 'oregon-coast-getaway',
    category: 'Weekend Getaway',
    sku: 'OC39',
    description: 'Enjoy the ocean air and quaint coastal towns!',
    priceInCents: 269995,
    tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
    inSeason: false,
    maximumGuests: 8,
    available: true,
    packagesSold: 0,
}).save();

new Vacation({
    name: 'Rock Climbing in Bend',
    slug: 'rock-climbing-in-bend',
    category: 'Adventure',
    sku: 'B99',
    description: 'Experience the thrill of rock climbing in the high desert.',
    priceInCents: 289995,
    tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing', 'hiking', 'skiing'],
    inSeason: true,
    requiresWaiver: true,
    maximumGuests: 4,
    available: false,
    packagesSold: 0,
    notes: 'The tour guide is currently recovering from a skiing accident.',
}).save();

});

router.use(function(req, res, next) {
  //if flash
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

//middleware to add weather to context
router.use(function(req, res, next){
  if (!res.locals.partials) res.locals.partials = {};
  res.locals.partials.weatherContext =weather.getWeatherData();
  next();
});

//create admin subdomain
var admin = express.Router();
router.use(require('vhost')('admin.*', admin));
admin.get('/', function(req, res) {
  res.render('/meadowlark/admin/home');
})
admin.get('/users', function(req, res){
  res.render('/meadowlark/admin/users');
});

require('./routes.js')(router);




router.post('/process', function(req, res) {
  console.log('Form (from querystring):' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name(from visible form field): ' + req.body.name);
  console.log('Email (from visible from field): ' + req.body.email);
  if(req.xhr || req.accepts('json, html') === 'json') {
    res.send({success: true});
  }else {
      res.redirect(303, '/meadowlark/thank-you');
  }
});




/** 
router.get('/tours/:tour', function(req, res, next) {
  Product.findOne({
    category: 'tour',
    slug: req.params.tour
  }, function(err, tour){
    if(err) return next(err);
    if(!tour) return next();
    res.render('/meadowlark/tour.handlebars', {tour: tour});
  });
});

router.get('adventures/:subcat/:name' , function(req, res, next) {
  Product.findOne({
    category: 'adventure',
    slug: req.params.subcat+'/' +req.params.name
  }, function(err, adventure){
    if(err) return next(err);
    if(!adventure) return next();
    res.render('meadowlark/adventure.handlebars', {adventure: adventure});
  });
});
**/

//router.use(cartValidation.checkWaivers);
//router.use(cartValidation.checkGuestCounts);

var autoViews = {};




//404 error catch all handler
router.use(function(req, res, next){
  res.status(404);
  res.render('meadowlark/404.handlebars');
});

//500 error handler
router.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('meadowlark/500.handlebars');
})

module.exports = router;
