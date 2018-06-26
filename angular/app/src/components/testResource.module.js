/**
 * This is a temporary file to play with Restangular
 */

angular.module('hvzGameManager')
  .controller('TestResource', ['$scope', 'nodeResource', function($scope, nodeResource){
    // nodeResource.get('1', {'_format': 'json'})
    // .then(function(data) {
    //   console.log("Sucess");
    //   console.log(data);
    //   var test = data;
    //   $scope.nodeTitle = data.title[0].value;
    //   $scope.body = data.body[0].value;
    // })
    // .catch(function(data) {
    //   console.log("Failed");
    // });
    // 
    $scope.nodeTitle = '';
    $scope.body = 'Nothing to see here';

    nodeResource.getNode(1)
      .then(function(node){
        $scope.nodeTitle = node.title[0].value;
        $scope.body = node.body[0].value;
      })
      .catch(function(data){
        console.log("unable to get node");
      });
    
  }]);