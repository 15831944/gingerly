(function () {
  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

    function locationDetailCtrl ($routeParams, $location,  $uibModal, loc8rData, authentication) {
      var vm = this;
      vm.locationid = $routeParams.locationid;
      vm.isLoggedIn = authentication.isLoggedIn();
      vm.currentPath = $location.path();
      
      loc8rData.locationById(vm.locationid)
        .then(function (result, status, config, header){
          vm.data={location: result.data};
          vm.pageHeader = {
            title: vm.data.location.name
          };
        }, function (result, status, config, header) {
          console.log("error status "+ status);
        });

      vm.popupReviewForm = function(){

        var modalInstance = $uibModal.open({
          templateUrl: '/loc8r/reviewModal/reviewModal.view.html',
          controller: 'reviewModalCtrl as vm',
          resolve: {
            locationData: function() {
              return {
                locationid: vm.locationid,
                locationName: vm.data.location.name
              };
            }
          }
        });
        modalInstance.result.then(function(data){
          vm.data.location.reviews.push(data);
        });
      }
    }
})();
