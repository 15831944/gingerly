'use strict';

angular.module('spBlogger.posts', ['spBlogger.posts.controllers', 'ui.router']);

angular.module('spBlogger.posts').config(function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('allPosts', {
          url: '/posts',
          templateUrl: 'modules/posts/views/posts.html',
          controller: 'PostController'
        })
        .state('singlePost', {
          url: '/posts/:id/:permalink',
          templateUrl: 'modules/posts/views/singlePost.html',
          contrller: 'PostDetailsController'
        });

        $urlRouterProvider.otherwise('/posts');

});
