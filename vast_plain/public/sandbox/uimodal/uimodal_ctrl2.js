(function() {
  angular
    .module('ui.bootstrap.demo')
      .controller('ModalInstanceCtrl', function($scope, $uibModalInstance) {

        //$scope.searchTerm = term;

        $scope.ok = function() {
          //modalFactory.open('lg', 'result.html', {searchTerm: $scope.searchTerm});
          $uibModalInstance.close($scope.searchTerm);
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss('cancel');
        };
      });
  })();
