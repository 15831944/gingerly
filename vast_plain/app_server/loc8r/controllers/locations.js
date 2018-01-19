module.exports.homelist = function(req, res) {
  res.render('loc8r/locations-list', {
    title: 'Home Loc8r',
    pageHeader : {
          title: 'Loc8r',
          strapline: 'find the best resources to work with'
        },
    sidebar: "Always look for the best projects to work.",
    locations: [{
          name: 'StarCoders',
          address: '125 High Street, Reading, RG6 1PS',
          rating: 3,
          facilities: ['Smart', 'JS', 'Premium'],
          distance: '100m'
        },{
          name: 'TC Hero',
          address: '126 High Street, Reading, RG6 1PS',
          rating: 4,
          facilities: ['Hardwork', 'Teamcenter', 'Premium'],
          distance: '200m'
        },{
          name: 'Ember Queen',
          address: '127 High Street, Reading, RG6 1PS',
          rating: 2,
          facilities: ['Ember', 'Premium'],
          distance: '250m'
        }]

  });
}
module.exports.locationInfo = function(req, res) {
  res.render('loc8r/location-info', {title: 'Location Info'});
}
module.exports.addReview = function(req, res) {
  res.render('loc8r/location-review-form', {title: 'Add Review'});
}
module.exports.about = function(req, res) {
  res.render('loc8r/generic-text', {title: 'About'});
}
