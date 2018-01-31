angular.module('loc8rApp',[]);

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function() {
 return function(distance) {
   var numDistance, unit;
   if (distance && _isNumeric(distance)) {
    if (distance > 1 ) {
       numDistance = parseFloat(distance).toFixed(1);
       unit = 'km';
    } else {
       numDistance = parseInt(distance * 1000, 10);
       unit = 'm';
    }
    return numDistance + unit;
  } else {
	  return "?";
  }
 };
};

var ratingStars = function(){
  return {
    scope: {
      thisRating : '=rating'
    },
    templateUrl : '/templates/rating-stars.html'
  };
};

var geolocation = function(){
  var getPosition = function(cbSuccess, cbError, cbNoGeo){
     if (navigator.geolocation){
	      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
     } else {
	     cbNoGeo();
     }
  };
  return {
	  getPosition: getPosition
  };
};

var loc8rData = function($http){
  var locationByCoords = function (lat, lng) {
      return $http.get('/api/loc8r/locations?lng='+lng+'&lat='+lat+'&maxDistance=700000');
  };
  return {
    locationByCoords: locationByCoords
  };


}

var locationListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = "Checking your location";
  $scope.getData = function(position) {
    $scope.message = "Searching for nearby places";
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    console.log("lat = " +lat+ "  lng=" + lng);
    loc8rData.locationByCoords(lat,lng).then(function(result, status, config, headers) {
      $scope.message = result.data.length>0 ? "" : "no locaiton nearby";
      $scope.data = { locations: result.data};
      console.log( result.data.length);
    } , function (result, status, config, headers) {
         $scope.message = "error getting locations...";
         console.log("error");
    });
  };
  $scope.showError = function(error) {
   $scope.$apply(function(){
     $scope.message = error.message;
   });
  };

  $scope.noGeo = function(){
    $scope.$apply(funciton(){
      $scope.message = "geo location is not supported";
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);

};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
