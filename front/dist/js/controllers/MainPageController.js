angular.module('app.controllers')
.controller('MainPageController', function($scope, $location) {
  $scope.doLogout = function() {
    $location.path( "/login" );
  }
});