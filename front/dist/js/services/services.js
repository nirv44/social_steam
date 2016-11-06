angular.module('app.services')
.factory('services', function() {
  return {
    
    // Subscription service
    subscribe: function(subscriber) {
      if (!isValidSubscriber(subscriber)) {
        throw new SubscribeException("invalid subscriber");
      }
      // TODO [AVAN] : Call subscribe service
    },
    
    
    // Login service
    login: function(user) {
      if (!isValidUser(user)) {
        throw new LoginException("invalid user");
      }
      // TODO [AVAN] : Call login service
    }
    
  };
});