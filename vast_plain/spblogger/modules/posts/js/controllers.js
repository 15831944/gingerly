'use strict'

angular.module('spBlogger.posts.controllers', ['spBlogger.posts.services'])
  .controller('PostController',  function($scope, postService) {
    $scope.getAllPosts = function(){
      return postService.getAll();
    };
    $scope.posts = $scope.getAllPosts();
  }).controller('PostDetailsController',  function($stateParams, $state, $scope, postService){
    $scope.getPostById = function(id) {
      return postService.getPostById(id);
    }
    $scope.closePost = function(){
      $state.go('allPosts');
    }

    $scope.singlePost = $scope.getPostById($stateParms.id);

  });
