(function(){
  angular
    .module('loc8rApp')
    .directive('footerGeneric', footerGeneric);
    function footerGeneric(){
      return {
        restrict: 'EA',
        templateUrl: '/loc8r/common/directives/footerGeneric/footerGeneric.template.html'
      };
    }
})();
