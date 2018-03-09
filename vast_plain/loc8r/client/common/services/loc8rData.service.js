(function(){
  angular
     .module('loc8rApp')
     .service('loc8rData', loc8rData);

  //loc8rData.$inject = ['$http'];
  function loc8rData($http, authentication){
    var locationByCoords = function (lat, lng) {
        //return $http.get('/api/loc8r/locations?lng='+lng+'&lat='+lat+'&maxDistance=700000');
        return $http.get('/api/loc8r/locations?lng=-0.9692599&lat=51.4558091&maxDistance=700000');
    };
    var locationById = function(locationid) {
      return $http.get('/api/loc8r/locations/'+locationid);
    };
    var addReviewById = function(locationid, data) {
      return $http.post('/api/loc8r/locations/' + locationid + '/reviews' , data , {
        headers: {
          Authorization: 'Bearer' + authentication.getToken()
        }
      });
    };

    return {
      locationByCoords: locationByCoords,
      locationById: locationById,
      addReviewById: addReviewById
    };
  }
})();
