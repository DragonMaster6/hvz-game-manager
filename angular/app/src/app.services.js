/**
 * Main Services and Resources used to connect with Drupal.
 */

angular.module('hvzGameManager')
  .factory('userResource', ['Restangular', function(Restangular){
    var userResource = Restangular.all('user');
    var service = {};

    // The login callback.
    service.login = function(username, password) {
      var loginResource = Restangular.all('user/login');
      // Sanitize the username and password.
      // Post the information to Drupal
      var data = {name: username, pass:password};
      return loginResource.post(data, {'_format':'json'});
    }

    service.logout = function() {
      var loginResource = Restangular.one('user/logout');
      return loginResource.get();
    }

    service.getUser = function(uid) {
      return userResource.get(uid, {'_format':'json'});
    }

    return service;
  }])

  // Basic Page Node fetcher
  .factory('nodeResource', ['Restangular', function(Restangular){
    // var nodeResource = Restangular.service('node');
    // return Restangular.service('node');
    var nodeResource = Restangular.all('node');
    var service = {};

    service.getNode = function(nid) {
      return nodeResource.get(nid, {'_format': 'json'});
    }

    return service;

  }])

  // Stores the current session a user has.
  .factory('session', ['$localStorage', 'userResource', function($localStorage, userResource) {
    var currentSession = {};

    // Constructor and Destructor
    currentSession.create = function(userId, csrfTok, logoutTok) {
      var newSession = {
        uid: userId,
        token: csrfTok,
        logoutToken: logoutTok,
      };

      // Create a cookie to store this information.
      $localStorage.currentSession = newSession;
    }

    // Deletes the session data as it is no longer valid.
    currentSession.delete = function() {
      delete $localStorage.currentSession;
    }

    // Returns the current user's data
    currentSession.getSession = function() {
      return $localStorage.currentSession;
    }

    // Returns the current user's data
    currentSession.getCurrentUser = function() {
      // Default to the anonymous user.
      var currentSession = this.getSession();
      var currentUserId = 0;
      var result = false;
      if (currentSession) {
        currentUserId = currentSession.uid;
        result = userResource.getUser(currentUserId);
      }


      return result;
    }

    return currentSession;
  }]);