'use strict';

// Declare app level module which depends on views, and components
angular.module('HvzGameManager', [
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'restangular',
  'PlayerRegister',
])

.config(['$httpProvider', '$locationProvider', '$routeProvider', 'RestangularProvider', function($httpProvider, $locationProvider, $routeProvider, RestangularProvider) {
  $locationProvider.hashPrefix('!');

  // Main View to display everything
  $routeProvider
    .when('/', {
      redirectTo: '/player/register',
    })
    .when('/player/register', {
      controller: 'PlayerRegisterController',
      templateUrl: 'src/sections/player/register/register.template.html'
    })
    .otherwise({redirectTo: '/'});

  // Make Urls clean by using html5mode
  $locationProvider.html5Mode(true);

  // Configure the app to use Drupal's REST api
  RestangularProvider.setBaseUrl('http://admin.hvz.b.local');

  // To enable cookie based authentication, set withCredentials to true
  $httpProvider.defaults.withCredentials = true;

}]);
