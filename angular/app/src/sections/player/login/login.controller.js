'use strict';

angular.module('hvz.PlayerLogin')
  .controller('PlayerLoginController', ['$location', '$scope', 'session', function($location, $scope, session){
    // TODO: Add logic to redirect a logged in user. No need to show this page
    // if they are already logged in.
    $scope.user = {name: '', pass: ''};
    $scope.message = '';

    $scope.login = function login() {
      session.login($scope.user.name, $scope.user.pass)
        .then(function(data){
          console.log('success', data);
          session.create(data.current_user.uid, data.csrf_token, data.logout_token);
          $scope.$emit('userLogin', {'some': 'data'});
          $location.path('/player/dashboard');
        })
        .catch(function(err){
          switch (err.status) {
            case 400:
              // Wrong username or password;
              $scope.message = 'Could not recognize your username and password combo.';
              break;
            case 403:
              // User is already logged in or has exceeded the amount of time you can log in.
              $scope.message = 'Looks like you forgot your password. Try reseting your password or come back in an hour to try again.';
              break;
          }
        });
    }
  }]);
