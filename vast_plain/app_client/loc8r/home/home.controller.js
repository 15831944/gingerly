angular
  .module('loc8rApp')
  .controller('homeCtrl', homeCtrl);

function homeCtrl(loc8rData, geolocation) {

  var vm = this;
  vm.one = 'actural one from view model';
  vm.pageHeader = {
    title: 'Loc8r SPA',
    strapline: 'Best Resources in TC, NX, AWS, AngularJS, EmberJS and BackboneJS'
  };
  vm.sidebar = {
    content: "Always Looking for the best projects"
  };
  vm.message = "Checking your location..."
  vm.getData = function(position) {
    vm.message = "Searching for nearby places";
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    console.log("lat = " +lat+ "  lng=" + lng);
    loc8rData.locationByCoords(lat,lng).then(function(result, status, config, headers) {
      vm.message = result.data.length>0 ? "" : "no locaiton nearby";
      vm.data = { locations: result.data};
      console.log( result.data.length);
    } , function (result, status, config, headers) {
         vm.message = "error getting locations...";
         console.log("error");
    });
  };
  vm.showError = function(error) {
   $scope.$apply(function(){
     vm.message = error.message;
   });
  };

  vm.noGeo = function(){
    $scope.$apply(function(){
      vm.message = "geo location is not supported";
    });
  };

  geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
}
