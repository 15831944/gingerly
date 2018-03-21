'use strict'

angular.module('spBlogger.posts.controllers', ['spBlogger.admin.services'])
  .controller('PostController',  function($scope, Post) {

    $scope.posts = Post.query();
  }).controller('PostDetailsController',  function($stateParams, $state, $scope, Post){

    $scope.closePost = function(){
      $state.go('allPosts');
    }

    $scope.singlePost = Post.getd({id:$stateParms.id});

  });
