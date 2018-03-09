angular.module('multipleViewsApp.controllers', [])
.controller('MVController1', function($scope, $location) {
  console.log("enter controller1");
  $scope.message="hello angularjs";
  $scope.loadView2=function(){
    //to get back to routes def
    console.log("current path " + $location.path());
    $location.path('/view2/' + $scope.firstname+'/'+$scope.lastname);

  }

}).controller("MVController2", function($scope, $routeParams, names){

   console.log("controller 2 names resolved as " + names)
   $scope.now = new Date();
   $scope.firstname = $routeParams.firstname;
   $scope.lastname = $routeParams.lastname;
   $scope.names = names;

});
