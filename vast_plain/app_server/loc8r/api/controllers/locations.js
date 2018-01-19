var  request = require('request');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonReponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.locationsCreate = function(req, res) {
    console.log(req.body);

};

module.exports.locationsListByDistance = function(req, res) {
    res.send('locationsListByDistance');
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
    res.send('locationsUpdateOne');
};


module.exports.loctionsDeleteOne = function(req, res) {
    res.send('loctionsDeleteOne');
};
