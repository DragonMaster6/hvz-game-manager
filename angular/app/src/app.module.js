'use strict';

// Declare app level module which depends on views, and components
angular.module('hvz', [
  'ngRoute',
  'ngSanitize',
  'hvz.PlayerRegister',
  'hvz.PlayerLogin',
  'hvz.PrimaryMenu',
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

}])

/** Main App Initialization **/
.run(function($rootScope, session){
  // Check if there is a current session.
  // TODO: Change how this works to incorporate users who have deleted their cookies but
  //   still logged onto Drupal.
  if (session.getCurrentSession()) {
    $rootScope.loggedin = true;
  }
  else {
    $rootScope.loggedin = false;
  }

  $rootScope.$on('userLogin', function(event, data){
    console.log(event);
    console.log(data);
    // Update a few variables to indicate the current state.
    $rootScope.loggedin = true;
  });

  $rootScope.$on('userLogout', function(event, data){
    $rootScope.loggedin = false;
  });
})

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
        $scope.$emit('userLogout');
      })
      .catch(function(err){
        // There was an error logging out.
        console.log("Error logging out", err);
      });
  }
}]);
