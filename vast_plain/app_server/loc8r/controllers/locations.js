var request = require('request');
var req_debug = require('request');
req_debug.debug = true

var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://vast-plains-29008.herokuapp.com" ;
}

var _formatDistance = function(distance) {
  var numDistance, unit;
  if (distance > 1) {
    numDistance = parseFloat(distance).toFixed(1);
    unit = 'km';
  } else {
    numDistance = parseInt(distance*1000, 10);
    unit = 'm';
  }
  return numDistance + unit;
};

var renderHomepage = function(req, res, responseBody) {
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length ) {
      message = "Nothing found nearby";
    }
  }
  res.render('loc8r/locations-list', {
    title: 'Home Loc8r Home',
    pageHeader : {
          title: 'Loc8r',
          strapline: 'find the best resources to work with'
        },
    sidebar: "Always look for the best projects to work from end to end",
    locations: responseBody,
    message: message
  });
};

module.exports.homelist = function(req, res) {
  var requestOptions, path;
  path = '/api/loc8r';
  console.log("homelist calling api " + apiOptions.server+path);
  options = {
    url: 'http://localhost:3000/'
  };

  request(
    options,
    function(err, response, body) {
      console.log('satuscode:'+response.statusCode);
      console.log('body' + body);
      console.log('error' + err);
      var i, data;
      data = body;
      if (response.statusCode === 200 && data.length) {
        for ( i=0; i< data.length; i++) {
          data[i].distance = _formatDistance(data[i].distance);
        }
      }
      renderHomepage(req, res, data);
    });

};

module.exports.locationInfo = function(req, res) {
  res.render('loc8r/location-info', {title: 'Location Info'});
}
module.exports.addReview = function(req, res) {
  res.render('loc8r/location-review-form', {title: 'Add Review'});
}
module.exports.about = function(req, res) {
  res.render('loc8r/generic-text', {title: 'About'});
}
