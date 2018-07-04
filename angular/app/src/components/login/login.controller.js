'use strict';

angular.module('hvzGameManager')
  .controller('LoginController', ['$location', '$rootScope', '$scope', 'session', 'userResource', function($location, $rootScope, $scope, session, userResource) {
    // Redirect the user if they are already logged in.
    console.log("Login Controller: The current user");
    console.log($rootScope.currentUser);
    if ($rootScope.currentUser != false) {
      console.log("redirecting");
      $location.path('/dashboard');
    }

    // Displays any errors that Drupal might throw back.
    $scope.message = '';

    // Username and Password to send to Drupal
    $scope.user = '';
    $scope.pass = '';

    // Login function after the submit button has been pressed
    $scope.login = function() {
      session.login($scope.user, $scope.pass)
        .then(function(data) {
          // Create a new session and redirect back to the home page.
          session.create(data.current_user.uid, data.csrf_token, data.logout_token);
          $location.path('/');
        })
        .catch(function(data){
          if (data.status == '403') {
            $scope.message = "You are already signed in.";
          }
        });
    }
  }]);
