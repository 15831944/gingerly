angular.module('movieApp.controllers', []).controller('MovieListController', function($scope, $state, popupService, $window, Movie){
  console.log("enter MovieListController");
  $scope.movies = Movie.query();
  $scope.deleteMovie = function(movie) {
    if (popupService.showPopup('Really delete this?')) {
      movie.$delete(function(){
        $window.location.href = '';
      });
    }
  };
}).controller('MovieViewController', function($scope, $stateParams, Movie){
  console.log("enter MovieViewController");
  $scope.movie = Movie.get({id: $stateParams.id});

}).controller('MovieEditController', function($scope, $state, $stateParams, Movie){
  console.log("enter MovieEditController");
  $scope.updateMovie = function(){
    $scope.movie.$update(function(){
      $state.go('movies');
    });
  };
  $scope.loadMovie = function(){
    $scope.movie = Movie.get({id: $stateParams.id});
  };
  $scope.loadMovie();

}).controller('MovieCreateController', function($scope, $state, $stateParams, Movie){
  console.log("enter MovieCreateController");
  $scope.movie = new Movie();
  $scope.addMovie = function(){
    $scope.movie.$save(function(){
      $state.go('movies');
    });
  };
});
