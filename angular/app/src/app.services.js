/**
 * Main Services and Resources used to connect with Drupal.
 */

angular.module('hvzGameManager')
  .factory('userResource', ['Restangular', function(Restangular){
    var userResource = Restangular.all('user');
    var service = {};

    service.getUser = function(uid) {
      return userResource.get(uid, {'_format':'json'});
    }

    return service;
  }])

  // Manual Node Fetecher: /node/[nid]
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

  // Custom API end point to retrieve basic pages of a specific type.
  .factory('basicPageResource', ['Restangular', function(Restangular) {
    var pageResource = Restangular.allUrl('api/basic-page');
    var service = {};

    service.getPage = function(type) {
      return pageResource.get(type, {'_format': 'json'});
    }

    return service;
  }])

  // Stores the current session a user has.
  .factory('session', ['$localStorage', 'Restangular', 'userResource', function($localStorage, Restangular, userResource) {
    var currentSession = {};

    // The login callback.
    currentSession.login = function(username, password) {
      var loginResource = Restangular.all('user/login');
      // Sanitize the username and password.
      // Post the information to Drupal
      var data = {name: username, pass:password};
      return loginResource.post(data, {'_format':'json'});
    }

    currentSession.logout = function() {
      // Get the logout token from the current user
      var loginResource = Restangular.allUrl('user/logout');
      var currentSession = this.getSession();
      var result = false;

      // If there is a session, retrieve the token and perform the logout.
      if (currentSession) {
        var logoutToken = currentSession.logoutToken;
        var data = {
          '_format':'json',
          'token': logoutToken,
        };
        var headers = {
          'x-csrf-token': currentSession.token,
        }
        result = loginResource.post(null, data);
      }

      return result;
    }

    // Retrieves the logged in user's csrf token


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