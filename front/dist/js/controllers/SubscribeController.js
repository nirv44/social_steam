angular.module('app.controllers')
.controller('SubscribeController', function($scope, $location, services) {
  
  $scope.subscriber = {
    login: '', 
    password: '',
    confirmedPassword: '',
    firstname: '',
    lastname: '',
    mail: ''
  };
  
  // Launch user subscription
  $scope.doSubscribe = function() {
    try {
      services.subscribe($scope.subscriber);
      $location.path( "/login" );
    } catch (e) {
      console.log(e.name + ' : ' + e.message);
    }
  };
  
  // Returns to login page
  $scope.doCancel = function() {
    $location.path( "/login" );
  };
  
});