'use strict';

angular.module('hvzGameManager')
  .controller('LoginController', ['$location', '$rootScope', '$scope', 'session', 'userResource', function($location, $rootScope, $scope, session, userResource) {
    // Redirect the user if they are already logged in.
    console.log("The current user");
    console.log($rootScope.currentUser);
    if ($rootScope.currentUser != false) {
      console.log("redirecting");
      console.log(currentUser);
      $location.path('/');
    }

    // Displays any errors that Drupal might throw back.
    $scope.message = '';

    // Username and Password to send to Drupal
    $scope.user = '';
    $scope.pass = '';

    // Login function after the submit button has been pressed
    $scope.login = function() {
      userResource.login($scope.user, $scope.pass)
        .then(function(data) {
          // Create a new session and redirect back to the home page.
          console.log(data);
          session.create(data.current_user.uid, data.csrf_token, data.logout_token);
          $location.path('/');
        })
        .catch(function(data){
          $scope.message = "Login Failed";
        });
    }
  }]);