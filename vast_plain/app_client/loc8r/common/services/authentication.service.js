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
      console.log("getToken " +  $window.localStorage['loc8r-token'] );
      return $window.localStorage['loc8r-token'];
    };

    var isLoggedIn = function(){
      var token = getToken();
      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        console.log("isLoggedIn payload " + payload.toString() + " exp" + payload.exp);
        return payload.exp > Date.now()/1000;
      } else{
        return false;
      }
    };

    var currentUser = function(){
      if(isLoggedIn()) {
        console.log("==currentUser is logged in");
        var token = getToken();
        console.log("extract payload " + token);
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        console.log("===currentUser payload " + payload.toString());
            console.log("===email " + payload.email);
                console.log("===currentUser name " + payload.name);
                console.log("===current user exp " + payload.exp );
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
      console.log("enter login func");
      return $http.post('/api/loc8r/login', user)
        .then(function(result, status, config, header){
          saveToken(result.data.token);
        }, function (result, status, config, header) {
          console.log("login failed " + status);
        });
    };

    logout = function(){
        console.log("logout");
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
