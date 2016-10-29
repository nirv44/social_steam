angular.module('app.controllers')
.controller('LoginController', function($scope, $location) {
  $scope.doLogin = function() {
    $location.path( "/main" );
  }
});