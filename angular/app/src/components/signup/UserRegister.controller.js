angular.module('UserRegister')
  .controller('UserRegisterController', ['$location', '$rootScope', '$scope', 'basicPageResource', function($location, $rootScope, $scope, basicPageResource){
    // First check if the user is logged in. If so, redirect to dashboard.
    if ($rootScope.currentUser) {
      $location.path('/dashboard');
    }
  }]);