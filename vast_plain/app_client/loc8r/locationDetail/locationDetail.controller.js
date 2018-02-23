(function () {
  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);
  locationDetailCtrl.$inject = ['$routeParams', 'loc8rData'];
  function locationDetailCtrl ($routeParams, loc8rData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;
    loc8rData.locationById(vm.locationid)
      .then(function (result, status, config, header){
        vm.data={location: result.data};
        vm.pageHeader = {
          title: vm.data.location.name
        };
      }, function (result, status, config, header) {
        console.log("error status "+ status);
      });

  }
})();
