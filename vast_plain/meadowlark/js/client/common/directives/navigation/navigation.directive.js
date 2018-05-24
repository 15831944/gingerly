(function () {

  angular
    .module('loc8rApp')
    .directive('navigation', navigation);

  function navigation () {
    console.log("enter navigation directive ");
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navigation/navigation.template.html',
      controller: 'navigationCtrl as navvm'
    };
  }

})();
