'use strict';

angular.module('Shared')
  .factory('menuResource', ['Restangular', function(Restangular){
    var menuResource = Restangular.all('/api/menu_items');
    var menuFactory = {};
    var format = {'_format': 'json'};

    menuFactory.getMenu = function(menu_name) {
      return menuResource.get(menu_name, format);
    }

    return menuFactory;
  }]);
