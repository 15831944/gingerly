(function () {
  angular.module('loc8rApp', ['ui.bootstrap', 'ngRoute']);
  console.log("enter angular app loc8rApp");
  function config ($routeProvider) {
    console.log("loc8rApp to config routes");
    $routeProvider
    .when('/', {
      templateUrl: '/home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'

    })
    .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'

    })
    .when('/location/:locationid', {
     templateUrl: '/locationDetail/locationDetail.view.html',
     controller: 'locationDetailCtrl',
     controllerAs: 'vm'
   })
    .when('/register', {
      templateUrl: '/auth/register/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/auth/login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
  }

  angular
      .module('loc8rApp')
      .config(['$routeProvider', config]);
})();
