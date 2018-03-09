angular.module('scopeApp.controllers', []).
  controller('SiteController', function($scope) {
  	$scope.publisher = "SitePt";
  	$scope.type = "Web Devl";
    $scope.name = "Scope for SiteController";
  });


  //2nd controller
  angular.module('scopeApp.controllers').
      controller('BookController', function($scope) {
      	$scope.books = ['Jump Starts HTML5', 'Jump Starts CSS', 'Jump Starts Responsive Web Design'];
        $scope.name = "Scope for BookController";
        $scope.addToWishList = function(book) {
           $scope.wishListCount++;
        }
        $scope.wishListCount = 0;
        $scope.$watch('wishListCount', function(newV, oldV){
          console.log("watch called " + newV + " times");
          if (newV ==2) {
            alert("Great, you have two items in your wish list");
          }
        });
  });
