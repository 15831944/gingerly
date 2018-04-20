'use strict'

angular.module('spBlogger.admin', ['spBlogger.admin.controllers', 'spBlogger.admin.services', 'spBlogger.admin.filters', 'ui.router']);

angular.module('spBlogger.admin').config(['$stateProvider', function($stateProvider){
  $stateProvider.state('login', {
    url: '/login',
    abstract: true,
    controller: 'LoginController',
    templateUrl: 'modules/admin/views/login.html'
  }).state('admin', {
    url: '/admin',
    abstract: true,
    controller: 'AdminController',
    templateUrl: 'modules/admin/views/admin-home.html'
  }).state('admin.postNew', {
    url: '/posts/new',
    controller: 'PostCreationController',
    templateUrl: 'modules/admin/views/admin-new-post.html'
  }).state('admin.postUpdate', {
    url: '/posts/:id/edit',
    controller: 'PostupdateController',
    templateUrl: 'modules/admin/views/admin-update-post.html'
  }).state('admin.postViewAll', {
    url: '',
    controller: 'PostListController',
    templateUrl: 'modules/admin/views/admin-all-posts.html'
  });
}]);
