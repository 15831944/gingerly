angular.module('spBlogger.posts', [
  'spBlogger.posts.controllers',
  'ui.router'
]);

angular.module('spBlogger.posts').config(function($stateProvider){
  $stateProvider.state('allPosts', {
    url: '/posts',
    templateUrl: 'modules/posts/views/posts.html',
    controller: 'PostController'
  });
  $stateProvider.state('singlePost', {
    url: '/posts/:id/:permalink',
    templateUrl: 'modules/posts/views/singlePost.html',
    contrller: 'PostDetailsController'
  });
});
