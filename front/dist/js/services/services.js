angular.module('app.services')
.factory('services', function($location, $http, config, $rootScope) {
  return {
    
    // Subscription service
    subscribe: function(subscriber) {
      if (!isValidSubscriber(subscriber)) {
        throw new SubscribeException("invalid subscriber");
      }
      $.ShowSpinner();
      $http({
        method: 'POST',
        url: config.serviceGateway + '/inscription',
        data: subscriber
      }).then(function successCallback(response) {
        if (response.data.success) {
          $location.path( "/login" );
        }
        else {
          $location.path( "/subscribe" );
        }
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
        method: 'POST',
        url: config.serviceGateway + '/connexion',
        data: user
      }).then(function successCallback(response) {
        if (response.data.success && response.data.token !== null) {
          $rootScope.authToken = response.data.token;
          $rootScope.userId = response.data.iduser;
          $location.path( "/main" );
        }
        else {
          $location.path( "/login" );
        }
        $.HideSpinner();
      }, function errorCallback(response) {
        $.HideSpinner();
      });
    },
    
    
    // GetSteamUser service
    getSteamUser: function(userId) {      
      $.ShowSpinner();
      $http({
        method: 'POST',
        url: config.serviceGateway + '/roll',
        headers: { token: $rootScope.authToken },
        data: userId
      }).then(function successCallback(response) {
        var data = {
          avatarUrl: 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg',
          steamUsername: ''
        };
        if (response.data.success) {
          data = response.data;
        }
        $.HideSpinner();
        return data;
      }, function errorCallback(response) {
        $.HideSpinner();
      });
    }
    
  };
});