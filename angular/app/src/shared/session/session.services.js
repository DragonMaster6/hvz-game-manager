'use strict';

angular.module('Shared')
  .factory('session', ['$localStorage', 'Restangular', function($localStorage, Restangular){
    // Private variables and factory init.
    var sessionFactory = {};
    // Default format to send to drupal.
    var format = {'_format': 'json'};

    // Logs a player into drupal.
    sessionFactory.login = function(username, password) {
      var loginResource = Restangular.allUrl('user/login');
      var data = {
        name: username,
        pass: password,
      };
      return loginResource.post(data, format);
    }

    // Logs a player out of Drupal
    sessionFactory.logout = function() {
      var loginResource = Restangular.allUrl('user/logout');
      var currentSession = this.getCurrentSession();
      var logout_tok = '';
      if (currentSession) {
        logout_tok = currentSession.logout_token;
      }

      format.token = logout_tok;
      return loginResource.post('', format);
    }

    // Gets the current status of the current user.
    sessionFactory.getLoginStatus = function() {
      var loginResource = Restangular.oneUrl('user/login_status');
      return loginResource.get(format);
    }

    // Gets a new CSRF token for the current user
    sessionFactory.getToken = function() {
      var loginResource = Restangular.oneUrl('session/token');
      return loginResource.get(format);
    }

    // Creates/Updates a session and stores the necessary user information.
    sessionFactory.create = async function(uid, csrf_token, logout_token) {
      //TODO: Store the user object here.
      var data = {
        uid: uid,
        token: csrf_token,
        logout_token: logout_token,
      }

      $localStorage.currentSession = data;
    }

    // Deletes the cookie that stores the current logged in user
    sessionFactory.delete = function() {
      delete $localStorage.currentSession;
    }

    // Retrieves the entire session if there is one
    sessionFactory.getCurrentSession = function() {
      return $localStorage.currentSession;
    }

    // Retrieves the current user data
    sessionFactory.getCurrentUser = function() {
      // return $localStorage.currentSession;
    }

    return sessionFactory;
  }]);
