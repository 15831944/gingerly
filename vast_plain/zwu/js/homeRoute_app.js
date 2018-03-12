'use strict';

var uiRouteApp = angular.module('uiRouteApp', ['ui.router']);

uiRouteApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.projects = ['Loc8r', 'SPBlogger', 'Tracker', 'Meadowlark'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: '<h3><a href="https://fierce-shore-62674.herokuapp.com/">Teamcenter Notes</a>.</h3>'
        })


        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'partial-about.html' }
            }

        });

});
