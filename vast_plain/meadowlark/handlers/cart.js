var Vacation = require('../model/vacation.js');
//var Q = require('q');

var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

exports.middleware = function(req, res, next) {
    var cart = req.session.cart;
    if(!cart || !cart.items) return next();
    req.cart = {
        items: cart.items.map(function (item){
            return {
                guest: item.guests,
                sku: item.sku,
            };
        })
    };
    /** 
    var promises = req.cart.items.map(function(item){
        return Q.promises(function(resolve, reject){
            Vacation.findOne({sku: item.sku}, function(err, vacation){
                if(err) return reject(err);
                item.vacation = vacation;
                resolve();
            });
        });
    });
    Q.all(promises)
    .then (function(){
        next();
    })
    .catch(function (err){
        next(err);
    });
    **/
};


function addToCart(sku, guests, req, res, next) {
    console.log("enter cart add  post");
    console.log("sku -- " + req.body.sku);
    console.log("cart in session " +  req.session.cart);
    var cart = req.session.cart || (req.session.cart = {items: []});
    console.log("cart is " + cart);
    Vacation.findOne({sku: sku}, function(err, vacation){
      if(err) return next(err);
      if(!vacation) return next(new Error('Unknown product SKU: ' + req.body.sku));
      console.log("adding it to cart items");
      cart.items.push({
        sku: sku,
        guests: guests || 1,
      });
      console.log("redirect to cart" +cart.items.length);
      res.redirect(303, '/meadowlark/cart.handlebars');
    });
  };

  exports.addProcessGet = function (req, res, next) {
      addToCart(req.query.sku, req.query.guests, req, res, next);
  }
  
  exports.addProcessPost = function(req, res, next) {
      addToCart (req.body.sku, req.body.guests, req, res, next);
  }

  exports.home = function(req, res, next) {
      res.render('meadowlark/cart.handlebars', {cart: req.cart});
  }

  exports.checkout = function(req, res, next) {
      var cart = req.session.cart;
      if(!cart) next();
      res.render('/meadowlark/cart-checkout.handlebars');
  }

exports.thankYou =  function(req, res) {
    res.render('meadowlark/cart-thank-you', {cart: req.session.cart});
};

exports.emailThankYou = function(req, res) {
    res.render('meadowlark/eamil/cart-thank-you');
};

exports.checkoutProcessPost = function(req, res, next) {
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

  res.render('meadowlark/cart-thank-you.handlebars');
};

exports.setCurrency = function( req, res) {
    req.session.currency = req.params.currency;
    return res.redirect(303, '/meadowlark/vacations');
}