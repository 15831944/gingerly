'use strict';

angular.module('uiRouteApp', ['uiRouteApp.controllers', 'ui.router']);

angular.module('uiRouteApp').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    
    $stateProvider

        .state('view1', {
            url: '/view1',
            controller: 'URController1',
            templateUrl: 'partials/view1.html'
        })

        .state('view2', {
            url: '/view2',
            controller: 'URController2',
            templateUrl: 'partials/view2.html',
            resolve: {
               names: function(){
                  return ['first', 'second', 'third'];
               }
             }
        });

        $urlRouterProvider.otherwise('/view1');

});
