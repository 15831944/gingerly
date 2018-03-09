'use strict';

angular.module('applyApp', []).
  controller('TimeoutController', function($scope, $timeout) {
    $scope.scheduleTask = function(){
      console.log("enter scheduleTask");
      setTimeout(function(){
        //wrap the message update in a function inside apply
        $scope.$apply(function(){
          $scope.message = 'Fetched after 3 sec';
          console.log("message ="+ $scope.message);
        })
      }, 3000);
    }

    $scope.fetchMessage = function(){
      console.log("enter fetch Message");
      $timeout(function(){
        $scope.message2 = 'Fetched after 4 sec';
        console.log("message2 =" + $scope.message2);
      }, 4000);
    }
});
