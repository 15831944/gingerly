var  request = require('request');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonReponse = function(res, status, cotent){
  res.status(status);
  res.json(content);
};

module.exports.reviewsCreate = function(req, res) {
    console.log(req.body);

};

module.exports.reviewsReadOne = function(req, res) {
      res.send('reviewsReadOne');

};

module.exports.reviewsUpdateOne = function(req, res) {
    res.send('reviewsUpdateOne');
};


module.exports.reviewsDeleteOne = function(req, res) {
    res.send('reviewsDeleteOne');
};
