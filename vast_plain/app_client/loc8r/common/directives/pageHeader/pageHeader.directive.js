(function () {

  angular
    .module('loc8rApp')
    .directive('pageHeader', pageHeader);

  function pageHeader () {
    return {
      restrict: 'EA',
      scope: {
        content : '=content'
      },
      templateUrl: '/loc8r/common/directives/pageHeader/pageHeader.template.html'
    };
  }

})();
