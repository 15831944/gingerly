var app = angular.module('loc8rApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: '/sandbox/view.template.html',
      controller: 'Ctrl',
      controllerAs: 'vm',
    });
}]);

/****
app.controller('Ctrl', function() {
  this.one = 'actual';  //changed $scope -> this
});
***/
app.controller('Ctrl', function() {
  var vm = this;
  vm.one = 'actural one from view model';
  vm.pageHeader = {
    title: 'Loc8r SPA',
    strapline: 'Best Resources in TC, NX, AWS, AngularJS, EmberJS and BackboneJS'
  };
  vm.sidebar = {
    content: "Always Looking for the best projects"
  };

});
