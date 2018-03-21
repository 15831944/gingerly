'use strict'

angular.module('spBlogger.admin.controllers', ['spBlogger.admin.services'])
   .controller('AdminController', ['$scope' , function($scope){
     console.log("enter admin controller");
   }]).controller('PostCreationController', ['$scope', '$state', 'Post',  function($scope, $state, Post){
     console.log("enter PostCreationController ");
     $scope.post = new Post();
     $scope.buttonText = "Create";
     $scope.savePost = function(){
       console.log("enter savePost...");
       $scope.buttonText="Saving...";
       $scope.post.permalink = angular.lowercase($scope.post.title).replace(/[\s]/g, '-');
       $scope.post.$save(function(){
         console.log("enter Post save call back ");
         $state.go('admin.postViewAll');
       });
     }

   }]).controller('PostupdateController', ['$scope', 'Post', '$stateParams', '$state', function($scope, Post, $stateParams, $state){
     console.log("enter PostupdateController ");
     $scope.post = Post.get({id:$stateParams.id});
     $scope.buttonText="Update";
     $scope.updatePost = function(){
       console.log("enter update Post...");
       $scope.buttonText="Updating...";
       $scope.post.$update(function(){
         $state.go('admin.postViewAll');
       });
     }

   }]).controller('PostListController', ['$scope', 'Post', 'popupService', '$state', function($scope, Post, popupService, $state){
     console.log("enter  PostListController");
     $scope.posts = Post.query();
     $scope.deletePost = function(post) {
       if (popupService.showPopup('Really delete this ?')) {
         post.$delete(function(){
           $state.go('admin.postViewAll', undefined, {
             reload: true
           });
         });
       }
     }
   }]);
