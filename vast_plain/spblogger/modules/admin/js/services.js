'use strict'

angular.module('spBlogger.admin.services', [])
 .factory('Post', [
      '$resource', 'API_ENDPOINT', function($resource, API_ENDPOINT) {
      //  console.log("enter service factory Post");
        return $resource(API_ENDPOINT, {id: '@_id'},{
          update: {
            method: 'PUT'
          }
        });

  }]).service('popupService', ['$window', function($window) {
    this.showPopup = function(message) {
      return $window.confirm(message);
    }
  }]).value('API_ENDPOINT','https://vast-plains-29008.herokuapp.com/api/spblogger/posts/:id');

/**
**https://vast-plains-29008.herokuapp.com/api/spblogger/posts/:id
'http://localhost:3000/api/spblogger/posts/:id'
**/
