exports.requestGroupRate =  function(req, res ) {
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
    res.render('meadowlark/tours/request-group-rate.handlebars', {fortune: fortune.getFortune()});
  };

  exports.requestGroupRateProcessPost = function( req, res, next) {
      next(new Error ('Request group rate processing not yet implemented'));
  }

  exports.home = function( req, res, next) {
      next(new Error('Contact page not yet implemented'));


  }  
  
  exports.homeProcessPost = function( req, res, next) {
      next(new Error('Contact page not yet implemented'));

  }