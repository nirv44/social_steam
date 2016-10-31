angular.module('app.controllers')
.controller('LoginController', function($scope, $location) {
  
  $scope.user = {
    login: '', 
    password: ''
  };
  
  $scope.doLogin = function() {
    console.log($scope.user);
    $location.path( "/main" );
  };
  
  $scope.subscribe = function() {
    $location.path( "/subscribe" );
  };
  
});