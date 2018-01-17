module.exports.homelist = function(req, res) {
  res.render('loc8r/locations-list', {title: 'Home'});
}
module.exports.locationInfo = function(req, res) {
  res.render('loc8r/location-info', {title: 'Location Info'});
}
module.exports.addReview = function(req, res) {
  res.render('loc8r/index', {title: 'Add Review'});
}
module.exports.about = function(req, res) {
  res.render('loc8r/index', {title: 'About'});
}
