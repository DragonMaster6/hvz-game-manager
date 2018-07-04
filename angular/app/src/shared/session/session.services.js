'use strict';

angular.module('HvzGameManager')
  .factory('session', ['restangular', function(restangular){
    // Private variables and factory init.
    var sessionFactory = {};

    // Logs a player into drupal.
    sessionFactory.login = function(username, password) {

    }

    // Logs a player out of Drupal
    sessionFactory.logout = function() {

    }

    // Gets the current status of the current user.
    sessionFactory.getCurrentStatus = function() {

    }

    // Gets a new CSRF token for the current user
    sessionFactory.getToken = function() {
      
    }

    // Creates a new session and stores the necessary user information.
    sessionFactory.create = function(uid, csrf_token, logout_token) {

    }

    // Deletes the cookie that stores the current logged in user
    sessionFactory.delete = function() {

    }

    // Retrieves the current user data
    sessionFactory.getCurrentUser = function() {

    }
  }]);
