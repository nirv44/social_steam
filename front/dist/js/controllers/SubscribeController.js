angular.module('app.controllers')
.controller('SubscribeController', function($scope, $location) {
  
  $scope.subscriber = {
    login: '', 
    password: '',
    confirmedPassword: '',
    firstname: '',
    lastname: '',
    mail: ''
  };
  
  $scope.doSubscribe = function() {
    $location.path( "/login" );
  };
  
  $scope.doCancel = function() {
    $location.path( "/login" );
  };
  
});