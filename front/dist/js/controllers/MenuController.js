angular.module('app.controllers')
.controller('MenuController', function($scope, $location) {
  
  $scope.doLogout = function() {
    $location.path( "/login" );
  };
  
});