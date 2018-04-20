'use strict'

angular.module('spBlogger.posts.directives',[])
  .directive('spbComments', ['Post', function(Post){
    return {
      restrict:'AEC',
      scope: {
        postInstance:'='
      },
      replace:true,
      link:function(scope, elem, attrs) {
          scope.saveComment=function(){
            console.log("save comment func " + scope.postInstance);
            scope.postInstance.$update();
            var postID = scope.postInstance._id, savedPostInstance={};
            scope.comment.datePublished = new Date();
            angular.copy(scope.postInstance, savedPostInstance);
            savedPostInstance.comments.unshift(scope.comment);
            scope.postInstance.comments.unshift(scope.comment);
            scope.comment={};
            console.log("singlePost " + savedPostInstance._id);
            //savedPostInstance.$update();

          }
      },
      templateUrl: 'modules/posts/views/comments.html'
    }

}]);
