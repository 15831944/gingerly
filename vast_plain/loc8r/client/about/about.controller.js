(function () {
  angular
    .module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    console.log("enter aboutCtrl");
    var vm = this;
    vm.pageHeader = {
      title: 'About Loc8r',
    };
    vm.main = {
      content: 'loc8r is created to demo MEAN stack'
    };
  }
})();
