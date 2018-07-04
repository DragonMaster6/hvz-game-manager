'use strict';

// Declare app level module which depends on views, and components
angular.module('hvzGameManager', [
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'restangular',
])

.config(['$httpProvider', '$locationProvider', '$routeProvider', 'RestangularProvider', function($httpProvider, $locationProvider, $routeProvider, RestangularProvider) {
  $locationProvider.hashPrefix('!');

  // Main View to display everything
  $routeProvider
    .when('/', {
    })
    .otherwise({redirectTo: '/'});

  // Make Urls clean by using html5mode
  $locationProvider.html5Mode(true);

  // Configure the app to use Drupal's REST api
  RestangularProvider.setBaseUrl('http://admin.hvz.b.local');

  // To enable cookie based authentication, set withCredentials to true
  $httpProvider.defaults.withCredentials = true;

}]);
