(function() {
  angular
    .module('loc8rApp')
    .controller('registerCtrl', registerCtrl);

    function registerCtrl($location, authentication) {
      var vm = this;
      vm.pageHeader = {
        title: 'Create new account'
      };
      vm.credentials = {
        name: "",
        email: "",
        password: ""
      };

      vm.returnPage = $location.search().page || '/';
      vm.onSubmit = function(){
        vm.formError = "";
        if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
          vm.formError = "all fields are required";
          return false;
        } else {
          vm.doRegister();
        }
      };

      vm.doRegister = function(){
        vm.formError="";
        console.log("enter doRegister");
        authentication
          .register(vm.credentials)
          .then(function(result, status, config, header){
            console.log("doRegister success");
            $location.search('page', null);
            $location.path(vm.returnPage);
          });
      };

    }
})();
