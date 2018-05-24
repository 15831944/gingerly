(function() {
  angular
    .module('loc8rApp')
    .controller('loginCtrl', loginCtrl);

    function loginCtrl($location, authentication) {
      var vm = this;
      vm.pageHeader = {
        title: 'Sing in to Loc8r'
      };
      vm.credentials = {
        email: "",
        password: ""
      };

      vm.returnPage = $location.search().page || '/';
      vm.onSubmit = function(){
        vm.formError = "";
        if (!vm.credentials.email || !vm.credentials.password) {
          vm.formError = "all fields are required";
          return false;
        } else {
          vm.doLogin();
        }
      };

      vm.doLogin = function(){
        vm.formError="";
        console.log("enter doLogin");
        authentication
          .login(vm.credentials)
          .then(function(){
            $location.search('page', null);
            $location.path(vm.returnPage);
          });
      };

    }
})();
