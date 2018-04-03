'use strict';

angular.module('directiveApp', []);
angular.module('directiveApp').controller('directiveController', function($scope){
    $scope.message = ' I love JS';
});

angular.module('directiveApp').directive('helloWorld', function(){
      return {
        restrict: 'AEC',
        replace: true,
        template: '<p ng-click="clearMessage()">hello, AngularJS Directive! {{message}} </p>',
        link: function(scope, elem, attrs) {
          scope.$watch('message', function(value) {
            console.log('Message changed');
          });
          scope.clearMessage =function(){
            scope.message='';
          }
          elem.bind('mouseover', function(){
            elem.css('cursor', 'pointer');
          });
        }
      };
  });
