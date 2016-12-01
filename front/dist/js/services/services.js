angular.module('app.services')
.factory('services', function($location, $http, config) {
  return {
    
    // Subscription service
    subscribe: function(subscriber) {
      if (!isValidSubscriber(subscriber)) {
        throw new SubscribeException("invalid subscriber");
      }
      
      $.ShowSpinner();
      $http({
        method: 'GET',
        url: config.serverUrl + '/subscribe'
      }).then(function successCallback(response) {
        $location.path( "/login" );
        $.HideSpinner();
      }, function errorCallback(response) {
        $.HideSpinner();
      });
    },
    
    
    // Login service
    login: function(user) {
      if (!isValidUser(user)) {
        throw new LoginException("invalid user");
      }
      
      $.ShowSpinner();
      $http({
        method: 'GET',
        url: config.serverUrl + '/login'
      }).then(function successCallback(response) {
        if (response.token !== null) {
          authToken = response.token;
          $location.path( "/main" );
        }
        else {
          $location.path( "/login" );
        }
        $.HideSpinner();
      }, function errorCallback(response) {
        $.HideSpinner();
      });
    }
    
  };
});