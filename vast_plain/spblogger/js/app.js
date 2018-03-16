'use strict';

angular.module('spBlogger',
['spBlogger.posts', 'ui.router'
]);

angular.module('spBlogger').value('version', '1.0');
angular.module('spBlogger').run(['$state', function($state) {
  $state.go('allPosts');
}]);
