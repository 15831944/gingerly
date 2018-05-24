(function() {
  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$uibModalInstance','loc8rData', 'locationData'];
    function reviewModalCtrl($uibModalInstance, loc8rData, locationData) {
      var vm = this;
      vm.locationData = locationData;
      vm.onSubmit = function(){
        vm.formError = "";
        if ( !vm.formData.rating || !vm.formData.reviewText) {
          vm.formError = "All fields are required";
          return false;
        }else {
          console.log(vm.formData);
          vm.doAddReview(vm.locationData.locationid, vm.formData);
          //return false;
        }
      };

      vm.doAddReview = function (locationid, formData) {
        loc8rData.addReviewById(locationid, {
          rating: formData.rating,
          reviewText: formData.reviewText
        })
        .then (function(result, status, config, header){
          console.log("addReview success");
          vm.modal.close(result.data);
        }, function(result, status, config, header) {
          console.log("addReview returns " + status);
          vm.formError = "Save Review Failed";
        });
      }


      vm.modal = {
        cancel: function(){
          $uibModalInstance.dismiss('cancel');
        },
        close: function(result) {
          $uibModalInstance.close(result);
        }
      };
    }

})();
