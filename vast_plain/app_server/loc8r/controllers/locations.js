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

var _showError = function(req, res, status) {
  var title, content;
  if (status ===404) {
    title = "404, page not found";
    content = "Looks like we can not find this page, sorry.";
  }else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var getLocationInfo = function(req, res, cb) {
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
      if (response.statusCode ===200) {
        data.coods = {
          lng: body.coords[0],
          lat: body.coords[1]
        };
        cb(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

module.exports.homelist = function(req, res) {
  renderHomepage(req, res);
};

var renderHomepage = function(req, res) {
  res.render('loc8r/locations-list', {
    title: 'Loc8r',
    pageHeader : {
          title: 'Loc8r',
          strapline: 'find the best resources to work with'
        },
    sidebar: "Always look for the best projects to work"
  });
};
/*************************************************************
***COMMENT OUT to move this from EXPRESS TO Angular   ********
**************************************************************
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
************************************************************/

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
  getLocationInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res,  responseData);
  });
};

var renderReviewForm = function(req, res, locDetail) {
  res.render('loc8r/location-review-form', {
    title: 'Review' + locDetail.name + 'on Loc8r',
    pageHeader: {title: 'Review' + locDetail.name},
    error: req.query.err,
    url: req.originalUrl
  });
};

module.exports.doAddReview = function(req, res) {
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/loc8r/locations/" + locationid + '/reviews';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/loc8r/location/' + locationid + '/loc8r/reviews/new?err=val');
  } else {
    request (
      requestOptions,
      function(err, response, body) {
        console.log('doAddReview err' + err);
        console.log('doAddReview response' + response);
        console.log('doAddReview body' + body);

        if (response.statusCode ===201) {
          res.redirect('/loc8r/location/' + locationid);
        } else if (response.statusCode ===400 && body.name && body.name === "ValidationError") {
          res.redirect('/loc8r/location/' + locationid + '/reviews/new?err=val');
        }
        else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      } );
  }

};

module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, function(req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};
module.exports.about = function(req, res) {
  res.render('loc8r/generic-text', {title: 'About'});
}
