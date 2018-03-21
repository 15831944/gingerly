'use strict';

// Declare app level module which depends on filters, and services
angular.module('formApp', []).controller('FormController', function($scope){
  $scope.user = {};
  $scope.countries = [{
    id: 'US',
    desc: 'United States'
  }, {
    id: 'GB',
    desc: 'United Kingdom'
  }, {
    id: 'AU',
    desc: 'Australia'
  }];
});
