angular.module('simpleApp', []).
  controller('BasketCtrl', function($scope) {
    console.log("enter BascketCtrl");
    $scope.description = 'single ticket';
    $scope.cost = 8;
    $scope.qty = 1;
  });
