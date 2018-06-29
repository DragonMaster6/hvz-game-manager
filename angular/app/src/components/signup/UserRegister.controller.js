angular.module('UserRegister')
  .controller('UserRegisterController', ['$location', '$rootScope', '$sce', '$scope', 'basicPageResource', function($location, $rootScope, $sce, $scope, basicPageResource){
    // First check if the user is logged in. If so, redirect to dashboard.
    if ($rootScope.currentUser) {
      $location.path('/dashboard');
    }

     // Retrieve all front page nodes to be displayed.
    basicPageResource.getPage('front')
      .then(function(nodes) {
        $scope.nodes = [];
        for (var element in nodes.plain()) {
          $scope.nodes = $scope.nodes.concat(nodes[element]);
        }
      })
      .catch(function(data) {
        console.log('issue getting the front page');
      });
  }]);