angular.module('app.controllers')
.controller('SubscribeController', function($scope, $location, services) {
  
  $scope.subscriber = {
    email: '', 
    password: '',
    confirmedPassword: '',
    steam_id: '',
    consumer_key:'',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  };
  
  // Launch user subscription
  $scope.doSubscribe = function() {
    try {
      services.subscribe($scope.subscriber);
    } catch (e) {
      console.log(e.name + ' : ' + e.message);
    }
  };
  
  // Returns to login page
  $scope.doCancel = function() {
    $location.path( "/login" );
  };
  
});