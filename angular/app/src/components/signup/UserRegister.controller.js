angular.module('UserRegister')
  .controller('UserRegisterController', ['$scope', 'basicPageResource', function($scope, basicPageResource){

    // Get the front page node from Drupal.
    basicPageResource.getPage('front')
      .then(function(nodes) {
        var pages = [];
        console.log("test", nodes.plain());
        // console.log('frontpage node', node);
        for (var element in nodes.plain()) {
          pages = pages.concat(nodes[element]);
        }
        $scope.nodes = pages;
      })
      .catch(function(data) {
        console.log('issue getting the front page');
      });
  }]);