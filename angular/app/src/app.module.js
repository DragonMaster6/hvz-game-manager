'use strict';

// Declare app level module which depends on views, and components
angular.module('HvzGameManager', [
  'ngRoute',
  'ngSanitize',
  'PlayerRegister',
  'PlayerLogin',
  'PrimaryMenu',
])

.config(['$httpProvider', '$locationProvider', '$routeProvider', 'RestangularProvider', function($httpProvider, $locationProvider, $routeProvider, RestangularProvider) {
  $locationProvider.hashPrefix('!');

  // Main View to display everything
  $routeProvider
    .when('/', {
      redirectTo: '/player/register',
    })
    .when('/player/login', {
      controller: 'PlayerLoginController',
      templateUrl: 'src/sections/player/login/login.template.html',
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
  RestangularProvider.setDefaultHttpFields({'withCredentials': 'true'});
  // RestangularProvider.setDefaultHeaders({
  //   'Access-Control-Allow-Credentials': 'true',
  // });

  // To enable cookie based authentication, set withCredentials to true
  // $httpProvider.defaults.withCredentials = true;

}])

/** Main controller to hold all global variables **/
.controller('MainController', ['$scope', 'menuResource', 'session', function($scope, menuResource, session){
  // Get the main menu for navigation.
  // TODO: Might want to revisit this. If a user's internet connection is slow, they may
  //   never be able to access the rest of the site.
  menuResource.getMenu('main')
    .then(function(menu_items){
      console.log("Menu", menu_items.plain());
      $scope.menu_items = menu_items.plain();
    })
    .catch(function(err){
      console.log("Error retreiving the Main menu!");
    });

  // If the user wishes to logout, they can here.
  $scope.logout = function() {
    session.logout()
      .then(function(response){
        // emit/broadcast the event that the user logged out.
      })
      .catch(function(err){
        // There was an error logging out.
        console.log("Error logging out", err);
      });
  }
}]);
