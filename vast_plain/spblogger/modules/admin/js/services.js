'use strict'

angular.module('spBlogger.admin.services', [])
 .factory('Post', function($resource, API_ENDPOINT) {
        console.log("enter service factory Post");
        return $resource(API_ENDPOINT, {
          id: '@_id'},{
            update: {
              method: 'PUT'
            }
          });

  }).service('popupService', ['$window', function($window) {
    this.showPopup = function(message) {
      return $window.confirm(message);
    }
  }]).factory('authService',
      ['AUTH_ENDPOINT', 'LOGOUT_ENDPOINT', '$http', '$cookieStore',
       function(AUTH_ENDPOINT, LOGOUT_ENDPOINT, $http, $cookieStore){
        var auth={};
        auth.login = function(usrname, password) {
          return $http.post(AUTH_ENDPOINT, {username:username, password:password}).then(function(response, status) {
            auth.user = response.data;
            $cookieStore.put('user', auth.user);
            return auth.user;
          });
        }
        auth.logout = function(){
          return $http.post(LOGOUT_ENDPOINT).then(function(response) {
            auth.user = undefined;
            $cookieStore.remove('user');
          });
        }
        return auth;

  }]);

angular.module('spBlogger.admin.services').value('API_ENDPOINT','http://localhost:3000/api/spblogger/posts/:id');
angular.module('spBlogger.admin.services').value('AUTH_ENDPOINT','http://localhost:3000/api/spblogger/login');
angular.module('spBlogger.admin.services').value('LOGOUT_ENDPOINT','http://localhost:3000/api/spblogger/logout');
  //.value('API_ENDPOINT','http://localhost:3000/api/spblogger/posts/:id');

/**
**https://vast-plains-29008.herokuapp.com/api/spblogger/posts/:id
'http://localhost:3000/api/spblogger/posts/:id'
**/
