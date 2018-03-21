'use strict';

// Declare app level module which depends on filters, and services
angular.module('promiseApp', [])
  .controller('PromiseController', [
    '$scope' , '$q', '$interval', function($scope, $q, $interval) {
      $scope.getPromise = function(){
        var i = 0;
        var deferred = $q.defer();
        var timer = $interval(function() {
          if (!! $scope.cancelRequested) {
            deferred.reject('Promise rejected due to cancellation');
            $interval.cancel(timer);
          }
          i = i + 1 ;
          if ( i ==5) {
            deferred.resolve('counter reaches 5');
            $interval.cancel(timer);
          } else {
            deferred.notify('Counter is ' + i);
          }
        }, 1000);
        console.log("return the promise");
        return deferred.promise;
      };
      $scope.getAsyncMessage = function(){
        var promise = $scope.getPromise();
        promise.then(function (message) {
          $scope.status = "resolved: " + message;
        }, function(message) {
          $scope.status = "rejected: " + message;
        }, function(message) {
          $scope.status = 'notifying: '+ message;
        });
      }
    }]);
