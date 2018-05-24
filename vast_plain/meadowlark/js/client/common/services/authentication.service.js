(function(){
  angular
     .module('loc8rApp')
     .service('authentication', authentication);

  //loc8rData.$inject = ['$http'];
  function authentication($http, $window){
    var saveToken = function(token) {
      console.log("save token to local storage");
      $window.localStorage['loc8r-token'] = token;
    };
    var getToken = function(){
      return $window.localStorage['loc8r-token'];
    };

    var isLoggedIn = function(){
      var token = getToken();
      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now()/1000;
      } else{
        return false;
      }
    };

    var currentUser = function(){
      if(isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
            email: payload.email,
            name: payload.name
        };
      }
    };

    register = function(user) {
      console.log("authentication register method to call http");
      return $http.post('/api/loc8r/register', user)
        .then(function(result, status, config, header){
            console.log("http post call back saveToken");
            saveToken(result.data.token);
      }, function (result, status, config, header) {
        console.log("register failed " + status);
      });
    };
    login = function(user) {
      return $http.post('/api/loc8r/login', user)
        .then(function(result, status, config, header){
          saveToken(result.data.token);
        }, function (result, status, config, header) {
          console.log("login failed " + status);
        });
    };

    logout = function(){
	      $window.localStorage.removeItem('loc8r-token');
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      register: register,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      login: login,
      logout: logout
    };
  }
})();
