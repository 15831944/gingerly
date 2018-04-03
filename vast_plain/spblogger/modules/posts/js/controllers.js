'use strict'

angular.module('spBlogger.posts.controllers', ['spBlogger.admin.services'])
  .controller('PostController',  function($scope, Post) {
    console.log("enter PostController...");
    $scope.posts = Post.query();
  }).controller('PostDetailsController',  function($stateParams, $state, $scope, Post){
    console.log("enter PostDetailsController...");
    $scope.closePost = function(){
      $state.go('allPosts');
    }

    console.log("post id " + $stateParams.id);
    $scope.singlePost = Post.get({id:$stateParams.id});

  });
