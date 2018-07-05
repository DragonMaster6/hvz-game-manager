'use strict';

angular.module('Shared')
  .factory('userResource', ['Restangular', function(Restangular){
    var userResource = {};
    var resource = Restangular.all('user');
    var format = {'_format': 'json'};

    userResource.registerUser = function(data) {
      var registerResource = Restangular.allUrl('user/register')
      return registerResource.post(data, format);
    }

    return userResource;
  }]);
