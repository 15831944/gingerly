var express = require('express');
var router = express.Router();
var path = require('path');

var formidable = require('formidable');
var fortune = require('./js/fortune.js');
var weather = require('./js/weather.js');
var cartValidation = require('./js/cartValidation.js');
var fs = require('fs');
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


router.get('/', function(req, res ) {
  //res.type('text/plain');
  //res.send('Meadowlark Travel');
  res.render('meadowlark/meadowlark_home.handlebars');
});

router.get('/about', function(req, res ) {
  //res.type('text/plain');
  //res.send('About Meadowlark Travel');
  res.render('meadowlark/about.handlebars', {fortune: fortune.getFortune()});
});

router.get('/nursery-rhyme', function(req, res ) {
  //res.type('text/plain');
  //res.send('About Meadowlark Travel');
  res.render('meadowlark/nursery-rhyme.handlebars', {fortune: fortune.getFortune()});
});

router.get('/data/nursery-rhyme', function(req, res ) {
  //res.type('text/plain');
  //res.send('About Meadowlark Travel');
  res.json({
    animal: 'squirrel',
    bodyPart: 'tail',
    adjective: 'bushy',
    noun: 'heck',
  });
});


router.get('/tours/request-group-rate', function(req, res ) {
  //res.type('text/plain');
  //res.send('About Meadowlark Travel');
  res.render('meadowlark/tours/request-group-rate.handlebars', {fortune: fortune.getFortune()});
});

router.get('/thank-you', function(req, res){
  res.render('meadowlark/thank-you.handlebars');
});

router.get('/newsletter', function(req, res) {
  res.render('meadowlark/newsletter.handlebars', {csrf: "CSRF tokens goes here"});
});

var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
function NewsletterSignup(){
}
NewsletterSignup.prototype.save = function(cb){
	cb();
};

//mockup product db -
function Product() {

}

Product.find = function(conditions, fields, options, cb) {
  if (typeof conditions === 'function') {
    cb = conditions;
    conditions = {};
    fields = null;
    options={};
  } else if (typeof fields === 'function') {
    cb=fileds;
    fields = null;
    options={};
  } else if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var products = [
      {
    			name: 'Hood River Tour',
    			slug: 'hood-river',
    			category: 'tour',
    			maximumGuests: 15,
    			sku: 723,
    		},
    		{
    			name: 'Oregon Coast Tour',
    			slug: 'oregon-coast',
    			category: 'tour',
    			maximumGuests: 10,
    			sku: 446,
    		},
    		{
    			name: 'Rock Climbing in Bend',
    			slug: 'rock-climbing/bend',
    			category: 'adventure',
    			requiresWaiver: true,
    			maximumGuests: 4,
    			sku: 944,
    		}
  ];

  cb(null, products.filter(function(p){
    if (conditions.category && p.category!==conditions.category) return false;
    if (conditions.slug && p.slug !== conidtions.slug) return false;
    if (isFinite(conditions.sku) && p.sku !==Number(conditions.sku)) return false;
    return true;
  }));

};

Product.findOne = function(conditions, fields, options,cb) {
  if(typeof conditions==='function') {
		cb = conditions;
		conditions = {};
		fields = null;
		options = {};
	} else if(typeof fields==='function') {
		cb = fields;
		fields = null;
		options = {};
	} else if(typeof options==='function') {
		cb = options;
		options = {};
	}
  Product.find(conditions, fields, options, function(err, products) {
    cb(err, products && products.length? products[0]: null);
  });
};

router.post('/newsletter', function(req, res) {
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
});

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

router.get('/newsletter/archive', function(req, res) {
    res.render('meadowlark/newsletter/archive.handlebars');
});

router.get('/contest/vacation-photo', function(req, res) {
  var now = new Date();
  res.render('meadowlark/contest/vacation-photo.handlebars', {
    year: now.getFullYear(),
    month: now.getMonth()
  });
});

var dataDir = __dirname+'/data';
var vacationPhotoDir =dataDir + 'vacation-photo';
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if(!fs.existsSync(vacationPhotoDir)) fs.mkdirSync(vacationPhotoDir);

function saveContestEntry(contestName, email, year, month, photoPath) {
  //to do later
}

router.post('/contest/vacation-photo/:year/:month', function(){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);
    if (err) return res.redirect(303, 'error');
    if (err) {
      req.session.flash = {
        type: 'danger',
        intro: 'Oops',
        message: 'There was an error processing your submission.' + 
        ' Please try again.',
      };
      return res.redirect(303, '/meadowlark/contest/vacation-photo');
    }

    var photo = files.photo;
    var dir = vacationPhotoDir + '/' + Date.now();
    var path = dir + '/' + photo.name;
    fs.mkdirSync(dir);
    fs.renameSync(photo.path, dir+'/' + photo.name);
    saveContestEntry('vacation-photo', field.email, req.params.year, req.params.month, path);
    req.session.flash = {
      type: 'success',
      intro: 'good luck',
      message: 'you have entered into the contest.',
    };

    return res.redirect(303, '/meadowlark/contest/vacation-photo/entries');
    //res.redirect(303, '/meadowlark/thank-you');
  });
});

router.get('/contest/vacation-photo/entries', function(req, res) {
  res.render('meadowlark/contest/vacation-photo/entries');
});

function convertFromUSD(value, currency) {
  switch(currency) {
    case 'USD': return value * 1 ;
    case 'GBP': return value * 0.6;
    case 'BTC': return value * 0.00237079;
    default: return NaN;
  }
}

router.get('/vacations', function(req, res) {
  console.log("enter vacations routing");
  Vacation.find({available: true}, function(err, vacations){
    var currency = req.session.currency || 'USD';
    var context = {
      currency: currency,
      vacations: vacations.map(function(vacation){
        return {
          sku: vacation.sku,
          name: vacation.name,
          description: vacation.description,
          inSeason: vacation.inSeason,
          price: convertFromUSD(vacation.priceInCents/100, currency),
          qty: vacation.qty,
        } ;
      })
    };
    switch (currency) {
      case 'USD' : context.currencyUSD = 'selected'; break;
      case 'GBP' : context.currencyGBP = 'selected'; break;
      case 'BTC' : context.currencyBTC = 'selected'; break;
    }
    res.render('meadowlark/vacations.handlebars', context);
  });
});

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

router.use(cartValidation.checkWaivers);
router.use(cartValidation.checkGuestCounts);

router.get('/cart/add', function(req, res, next) {
  console.log("enter cart add  get");
  console.log("sku ==" + req.query.sku);
  
  var cart = req.session.cart || (req.session.cart = {items: []});
  console.log("cart is " + cart);
  Vacation.findOne({
    sku: req.query.sku
  }, function(err, vacation){
    if(err) return next(err);
    if(!vacation) return next(new Error('Unknown product SKU: ' + req.query.sku));
    console.log("adding it to cart items"); 
    cart.items.push({
      vacation: vacation,
      guests: req.body.guests || 1,
    });
    console.log("redirect to cart" +cart.items.length);
    res.redirect(303, '/meadowlark/cart');
  });

});
router.post('/cart/add', function(req, res, next) {
  console.log("enter cart add  post");
  console.log("sku -- " + req.body.sku);
  console.log("cart in session " +  req.session.cart);
  var cart = req.session.cart || (req.session.cart = {items: []});
  console.log("cart is " + cart);
  Vacation.findOne({
    sku: req.body.sku
  }, function(err, vacation){
    if(err) return next(err);
    if(!vacation) return next(new Error('Unknown product SKU: ' + req.body.sku));
    console.log("adding it to cart items");
    cart.items.push({
      vacation: vacation,
      guests: req.body.guests || 1,
    });
    console.log("redirect to cart" +cart.items.length);
    res.redirect(303, '/meadowlark/cart');
  });
});

router.get('/cart', function(req, res) {
  console.log("enter cart");
  var cart = req.session.cart ;
  console.log("redirect to cart-" +cart.items.length);
  res.render('meadowlark/cart.handlebars', {cart: cart});
})

router.get('/cart/checkout', function(req, res, next) {
  var cart = req.session.cart;
  if (!cart)  next();
  res.render('meadowlark/cart-checkout');
});

router.get('/cart/thank-you', function(req, res) {
  res.render('meadowlark/cart-thank-you', {cart: req.session.cart});
});
router.get('/email/cart/thank-you', function(req, res) {
  res.render('meadowlark/eamil/cart-thank-you');
});

router.post('/cart/checkout', function(req, res, next) {
  var cart = req.session.cart;
  if (!cart)  next(new Error('cart does not exist'));
  var name = req.body.name || '';
  var email = req.body.email || '';
  if (!email.match(VALID_EMAIL_REGEX)) return res.next(new Error('invalid email address.'));
  cart.number = Math.random().toString().replace(/^0\.0*/, '');
  cart.billing = {
    name: name,
    email: email,
  };
  res.render('meadowlark/eamil/cart-thank-you', {
    layout: null,
    cart: cart
  }, function(err, html) {
    if (err) console.log('error in eamil template');
    eamilService.send(cart.billing.email, 'Thank you for booking with Meadowlark Travel', html);

  });

  res.render('meadowlark/cart-thank-you');
});

router.get('/notify-me-when-in-season', function(req, res) {
  res.render('meadowlark/notify-me-when-in-season', {sku: req.query.sku});
});

router.post('/notify-me-when-in-season', function(req, res) {
  VacationInSeasonListener.update(
    {email: req.body.email},
    {$push: {skus: req.body.sku}},
    {upsert: true},
    function(err){
      if(err) {
        console.error(err.stack);
        req.session.flash = {
          type: 'danger',
          intro: 'Ooops',
          messsage: 'There was an error processing your request.',
        };
        return res.redirect(303, '/meadowlark/vacations');
      }
      req.session.flash = {
        type: 'success',
        intro: 'Thank you!',
        message: 'You will be notifed when this vacation is in season.',
      };
      return res.redirect(303, '/meadowlark/vacations');
    }
  );
});


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
