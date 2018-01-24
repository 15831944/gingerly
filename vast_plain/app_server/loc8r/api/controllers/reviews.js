var  request = require('request');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonReponse = function(res, status, cotent){
  res.status(status);
  res.json(content);
};

var updateAverageRating = function(locationid){
  Loc
    .findById(locationid)
    .select('rating reviews')
    .exec(
      function(err, location) {
        if (!err) {
          doSetAverageRating(location);
        }
      });
};

var doSetAverageRating = function(location) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (location.reviews && location.reviews.length > 0) {
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for (i=0; i<reviewCount; i++) {
      ratingTotal = ratingTotal + locaiton.reviews[i].rating;
    }

    ratingAverage = parseInt(ratingTotal/reviewCount, 10);
    location.rating = ratingAverage;
    location.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("average rating updated to "+ ratingAverage);
      }
    });
  }
};


var doAddReview = function(req, res, location) {
  if (!location) {
    sendJsonReponse(res, 404 , {
      "message" : "location id not found"
    });
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location) {
      var thisReview;
      if (err) {
        console.log(err);
        sendJsonReponse(res, 400, err);
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length-1];
        sendJsonReponse(res, 201, thisReview);
      }
    });
  }
};

module.exports.reviewsCreate = function(req, res) {
    console.log(req.body);
    var locationid = req.params.locationid;
    if (locationid) {
      Loc
        .findById(locationid)
        .select('reviews')
        .exec(function(err, location){
          if (err) {
            sendJsonReponse(res, 400, err);
          } else {
            doAddReview(req, res, location);
          }
        });
    } else {
      sendJsonReponse(res, 404, {
        "message": "location id required"
      });
    }

};

module.exports.reviewsReadOne = function(req, res) {
      console.log('reviewsReadOne');
      if (req.params && req.params.locationid && req.params.reviewid) {
        Loc
          .findById(req.params.locationid)
          .select('name reviews')
          .exec(function(err, location) {
            var response, review;
            if (!location) {
                sendJsonReponse(res, 404, {
                  "message" : "location id not found"
                });
                return;
            }else if (err) {
              sendJsonReponse(res, 404, err);
              return;
            }
            if (location.reviews && location.reviews.length > 0) {
              review = location.reviews.id(req.params.reviewid);
              if (!review) {
                sendJsonReponse(res, 404, {
                  "message": "review id not found"
                });
              } else {
                response = {
                  location : {
                    name: location.name,
                    id: req.params.locationid
                  },
                  review: review
                };
                sendJsonReponse(res, 200, response);
              }
            } else {
              sendJsonReponse(res, 404, {
                "message": "no review found"
              });
            }
          });
      }else {
        sendJsonReponse(res, 404, {
          "message" : "location id and review id are required"
        });
      }

};

module.exports.reviewsUpdateOne = function(req, res) {
    console.log('reviewsUpdateOne');
    if (!req.params.locationid || !req.params.reviewid) {
      sendJsonReponse(res, 404, {
        "message" : "locaiton id and review id are both required"
      });
      return ;
    }
    Loc
      .findById(req.params.locationid)
      .select('reviews')
      .exec (
        function(err, location) {
          var thisReview;
          if (!location) {
            sendJsonReponse(res, 404 , {
              "message" : " location id not found"
            });
            return;
          } else if (err) {
            sendJsonReponse(res, 400, err);
            return ;
          }
          if (location.reviews && location.reviews.length > 0) {
            thisReview = location.reviews.id(req.parms.reviewid);
            if (!thisReview) {
              sendJsonReponse(res, 404, {
                "message" : "review id not found"
              });
            } else {
              thisReview.author = req.body.author;
              thisReview.rating = req.body.rating;
              thisReview.reviewText = req.body.reviewText;
              location.save(function(err, location) {
                  if (err) {
                    sendJsonReponse(res, 404, err);
                  }else {
                    updateAverageRating(location_id);
                    sendJsonReponse(res, 200, thisReview);
                  }
              });
            }
          }else {
            sendJsonReponse(res, 404, {
              "message" : " no review to update"
            });
          }
        });
    };


module.exports.reviewsDeleteOne = function(req, res) {
    console.log('reviewsDeleteOne');
    if (!req.params.locationid || req.params.reviewid) {
      sendJsonReponse(res, 404, {
        "message" : "Location and Review IDs are required"
      });
      return ;
    }
    Loc
      .findById(req.params.locationid)
      .select('reviews')
      .exec (
        function(err, location) {
          if (!location) {
            sendJsonReponse(res, 404 , {
              "message" : "locaiton not found"
            });
            return ;
          } else if (err) {
            sendJsonReponse(res, 400, err);
            return ;
          }
          if (location.reviews && location.reviews.length > 0 ) {
            if (!location.reviews.id(req.params.reviewid)){
              sendJsonReponse(res, 404, {
                "message" : " review id not found"
              });
            } else {
              location.reviews.id(req.params.reviewid).remove();
              location.save(function(err) {
                if (err) {
                  sendJsonReponse(res, 404, err);
                } else {
                  updateAverageRating(location._id);
                  sendJsonReponse(res, 204, null);
                }
              });
            }
          } else {
            sendJsonReponse(res, 404, {
              "message" : "no review to delete"
            })
          }
        } );
};
