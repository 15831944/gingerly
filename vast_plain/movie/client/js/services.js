angular.module('movieApp.services', []).factory('Movie', function($resource) {
  return $resource('http://localhost:3000/api/movie/movies/:id', {
    id: '@_id' },{
      update: {
        method: 'PUT'
      }

  });
}).service('popupService', ['$window', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  }
}]);
