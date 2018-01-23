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
    title: 'Loc8r',
    pageHeader : {
          title: 'Loc8r',
          strapline: 'find the best resources to work with'
        },
    sidebar: "Always look for the best projects to work",
    locations: responseBody,
    message: message
  });
};

module.exports.homelist = function(req, res) {
  var requestOptions, path;
  path = '/api/loc8r/locations';
  console.log("homelist calling api " + apiOptions.server+path);
  options = {
    url:   apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      lng: -0.9692599,
      lat: 51.4558091,
      maxDistance: 700000
    }
  };

  request(
    options,
    function(err, response, body) {
      //console.log('satuscode:'+ response.statusCode);
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

var renderDetailPage = function(req, res, locDetail) {
  res.render('loc8r/location-info', {
    title: locDetail.name,
    pageHeader: {title: locDetail.name},
    sidebar: {
      context: ' is on Loc8r because it has the excellent skillsets'
    },
    location: locDetail
  });
}
module.exports.locationInfo = function(req, res) {
  var requestOptions, path;
  path = '/api/loc8r/locations/' + req.params.locationid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request (
    requestOptions,
    function(err, response, body) {
      var data = body;
      data.coods = {
        lng: body.coords[0],
        lat: body.coords[1]
      };
      renderDetailPage(req, res, data);
    }
  )

}

module.exports.doAddReview = function(req, res) {
  //res.render('loc8r/location-review-form', {title: 'Add Review'});
}

module.exports.addReview = function(req, res) {
  res.render('loc8r/location-review-form', {title: 'Add Review'});
}
module.exports.about = function(req, res) {
  res.render('loc8r/generic-text', {title: 'About'});
}
