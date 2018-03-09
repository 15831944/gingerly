(function(){
  angular
    .module('loc8rApp')
    .directive('footerGeneric', footerGeneric);
    function footerGeneric(){
      console.log("enter footerGeneric");
      return {
        restrict: 'EA',
        templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
      };
    }
})();
