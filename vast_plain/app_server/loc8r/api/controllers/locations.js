var  request = require('request');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonReponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

var convertDis = (function(){
  var radius = 4371 ; //km
  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * radius);
  }
  var getRadsFromDistance = function(distance) {
    return parseFloat(distance/radius);
  }
  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();


module.exports.locationsCreate = function(req, res) {
    console.log(req.body);
    Loc.create({
      name: req.body.name,
      address: req.body.address,
      facilities: req.body.facilities.split(","),
      coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
      openingTimes: [{
        days: req.body.days1,
        opening: req.body.opening1,
        closing:  req.body.closing1,
        closed: req.body.closed1
      }, {
        days: req.body.days2,
        opening: req.body.opening2,
        closing:  req.body.closing2,
        closed: req.body.closed2
      }]
    }, function(err, location){
      if (err) {
        sendJsonReponse(res, 400, err);
      } else {
        sendJsonReponse(res, 201, location);
      }
    });
};

module.exports.locationsListByDistance = function(req, res) {
    console.log('locationsListByDistance');
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
      type: "Point" ,
      coordinates: [lng, lat]
    };
    var geoOptions  = {
      spherical: true,
      maxDistance: convertDis.getRadsFromDistance(20),
      num: 10
    };
    if (!lng || !lat) {
      sendJsonReponse(res, 404 , {
        "message" : " lng and lat are required"
      });
    }

    Loc.geoNear(point, geoOptions, function(err, results, status) {
      var locations = [];
      if (err) {
        sendJsonReponse(res, 404, err);
      }else {
        results.forEach(function (doc){
          locations.push({
            distance: convertDis.getDistanceFromRads(doc.dis),
            name: doc.obj.name,
            address: doc.obj.address,
            rating: doc.obj.rating,
            facilities: doc.obj.facilities,
            _id: doc.obj._id
          });
        });
      }

    });
};

module.exports.locationsReadOne = function(req, res) {
  console.log('locationsReadOne ' + req.params.locationid);
  if (req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          sendJsonReponse(res, 404, {
            "message" : "locationid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonReponse(res, 404, err);
          return;
        }
        console.log(location);
        sendJsonReponse(res, 200, location);
      });
  } else {
    sendJsonReponse(res, 404, {
      "message" : "no location id "
    });
  }
};

module.exports.locationsUpdateOne = function(req, res) {
    console.log('locationsUpdateOne');
    if (!req.params.locationid) {
      sendJsonReponse(res, 404, {
        "message" : "location id is required"
      });
      return ;
    }
    Loc
      .findById(req.params.locationid)
      .select('-reviews -rating')
      .exec(function(err, location){
        if (!location) {
          sendJsonReponse(res, 404, {
            "message" : "location id not found"
          });
        } else if (err) {
          sendJsonReponse(res, 400, err);
          return;
        }
        location.name = req.body.name;
        locaiton.address = req.body.address;
        location.facilities = req.body.facilities.split(",");
        location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openTimes = [{
          days: req.body.days1,
          opening: req.body.opening1,
          closing:  req.body.closing1,
          closed: req.body.closed1
        }, {
          days: req.body.days2,
          opening: req.body.opening2,
          closing:  req.body.closing2,
          closed: req.body.closed2
        }];
        location.save(function(err, location){
          if (err) {
            sendJsonReponse(res, 404, err);
          } else {
            sendJsonReponse(res, 200, location);
          }
        });
      });
};


module.exports.locationsDeleteOne = function(req, res) {
    console.log('locationsDeleteOne');
    var locationid = req.params.locationid;
    if (locationid) {
      Loc
        .findByIdAndRemove(locationid) 
        .exec (
          function(err, location) {
            if (err) {
              sendJsonReponse(res, 404, err);
              return ;
            }
            sendJsonReponse(res, 204, null);
          }
        );
    }else {
      sendJsonReponse(res, 404, {
        "message" : " no locationid"
      });
    }
};
