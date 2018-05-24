angular.module('simpleApp', []).
  controller('TimetableCtrl', function($scope, $http) {
    console.log("enter TimetableCtrl");
    $http.get('js/items.json')
      .then(function (data) {
        $scope.sessions = data.sessions;
      });

  });
