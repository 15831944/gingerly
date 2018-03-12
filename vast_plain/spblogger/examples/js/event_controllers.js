angular.module('eventApp.controllers', [])
.controller('MessageController', function($scope, $timeout) {
  	$scope.messages = [{
      sender: 'user1',
      text: 'Message1'
    }];
    var timer;
    var count = 0;
    console.log("define loadmessage");
    $scope.loadMessages = function(){
      count++;
      console.log("enter loadmessage " + count);
      $scope.messages.push({
        sender: 'user1',
        text: 'Random message'+count
      });
      console.log("wait two seconds");
      timer = $timeout($scope.loadMessages, 2000);
      if (count ==3) {
        console.log("broadcasting cancel event");
        $scope.$broadcast('EVENT_NO_DATA', 'Not Connected');
        $timeout.cancel(timer);
      }
    };
    console.log("start timer...");
    timer= $timeout($scope.loadMessages, 2000);
    $scope.$on('EVENT_RECEIVED', function(){
      console.log("recieved emitted event from child");
    });
  });

  angular.module('eventApp.controllers')
    .controller('StatsController', function($scope){
      $scope.name = 'World';
      $scope.status = 'Connected';
      $scope.statusColor = 'green';
      $scope.$on('EVENT_NO_DATA', function(event, data) {
        console.log("received broadcasted event, change status and color now ");
        $scope.status = data;
        $scope.statusColor = 'red';
        console.log("notify or emit parent i am done here");
        $scope.$emit('EVENT_RECEIVED');
      });
    });
