angular
   .module('loc8rApp')
   .service('loc8rData', loc8rData);

function loc8rData($http){
  var locationByCoords = function (lat, lng) {
      //return $http.get('/api/loc8r/locations?lng='+lng+'&lat='+lat+'&maxDistance=700000');
      return $http.get('/api/loc8r/locations?lng=-0.9692599&lat=51.4558091&maxDistance=700000');
  };
  return {
    locationByCoords: locationByCoords
  };
}
