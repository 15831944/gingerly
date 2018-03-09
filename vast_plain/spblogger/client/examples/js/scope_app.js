'use strict';

angular.module('scopeApp', ['scopeApp.controllers']);

angular.module('scopeApp')
  .run(function($rootScope){
    $rootScope.title = 'Famous Books';
    $rootScope.name = "Root Scope";
  });
