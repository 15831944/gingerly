angular.module('uiRouteApp.controllers', [])
.controller('URController1', function($scope, $location, $state) {
  console.log("enter controller1");
  $scope.message="hello angularjs";
  $scope.loadView2=function(){
    //to get back to routes def
    console.log("current path " + $location.path());
    $state.go('view2', {
      firstname: $scope.firstname,
      lastname: $scope.lastname
    })
   //  $location.path('/view2/' + $scope.firstname+'/'+$scope.lastname);

  }

}).controller("URController2", function($scope, $stateParams, names){

   console.log("controller 2 names resolved as " + names)
   $scope.now = new Date();
   $scope.firstname = $stateParams.firstname;
   $scope.lastname = $stateParams.lastname;
   $scope.names = names;

});
