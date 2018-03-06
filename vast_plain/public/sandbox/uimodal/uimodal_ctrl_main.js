(function() {
  angular
    .module('ui.bootstrap.demo')
      .controller('ModalDemoCtrl', function($scope, $uibModal) {

        //$scope.items = ['item1', 'item2', 'item3'];

        //$scope.animationsEnabled = true;


        $scope.open = function() {
          var modalInstance = $uibModal.open({
            //  animation: $scope.animationsEnabled,
              templateUrl:  'myModalContent2.html',
            //  controller: 'ModalInstanceCtrl',
            //  size: size
            });

          /*modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
          }, function() {
            $log.info('Modal dismissed at: ' + new Date());
          });*/
        };

      //  $scope.toggleAnimation = function() {
      //  $scope.animationsEnabled = !$scope.animationsEnabled;
      //  };

      });
    })();
