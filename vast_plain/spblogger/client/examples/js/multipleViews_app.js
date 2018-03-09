'use strict';

angular.module('multipleViewsApp', [
  'multipleViewsApp.controllers',
  'ngRoute'
]);

angular.module('multipleViewsApp')
  .config(function($routeProvider){
    $routeProvider.when('/view1', {
      controller: 'MVController1',
      templateUrl: 'partials/view1.html'
    }).when('/view2', {
      controller: 'MVController2',
      templateUrl: 'partials/view2.html',
      resolve: {
         names: function(){
            return ['first', 'second', 'third'];
         }
      }

    }).when('/view2/:firstname/:lastname', {
      controller: 'MVController2',
      templateUrl: 'partials/view2.html',
      resolve: {
         names: function(){
            return ['first', 'second', 'third'];
         }
      }
    }).otherwise({redirectTo: '/view1'});
});
