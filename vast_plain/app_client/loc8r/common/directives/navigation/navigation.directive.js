(function () {

  angular
    .module('loc8rApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/loc8r/common/directives/navigation/navigation.template.html'
    };
  }

})();
