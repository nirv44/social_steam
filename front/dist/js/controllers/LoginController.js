angular.module('app.controllers')
.controller('LoginController', function($scope, $location, services) {
  
  $scope.user = {
    login: '', 
    password: ''
  };
  
  // Launch user authentication
  $scope.doLogin = function() {
    try {
      services.login($scope.user);
    } catch (e) {
      console.log(e.name + ' : ' + e.message);
    }
  };
  
  // Go to subscription page
  $scope.subscribe = function() {
    $location.path( "/subscribe" );
  };
  
});