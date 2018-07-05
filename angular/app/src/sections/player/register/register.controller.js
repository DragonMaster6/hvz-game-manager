'use strict';

angular.module('PlayerRegister')
  .controller('PlayerRegisterController', ['$scope', 'session', function($scope, session){
    session.getLoginStatus()
      .then(function(data){
        console.log("succeed", data);
      })
      .catch(function(data){
        console.log("Failed", data);
      });
  }]);
