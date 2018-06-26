'use strict';

// Declare app level module which depends on views, and components
angular.module('hvzGameManager', [
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'restangular',
])

.config(['$locationProvider', '$routeProvider', 'RestangularProvider', function($locationProvider, $routeProvider, RestangularProvider) {
  $locationProvider.hashPrefix('!');

  // Main View to display everything
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'src/app.template.html',
    })
    .when('/test', {
      controller: 'TestResource',
      templateUrl: 'src/components/testResource.template.html',
    })
    // User Paths
    .when('/user/login', {
      controller: 'LoginController',
      templateUrl: 'src/components/login/login.template.html',
    })
    .otherwise({redirectTo: '/'});

  // Make Urls clean by using html5mode
  $locationProvider.html5Mode(true);

  // Configure the app to use Drupal's REST api
  RestangularProvider.setBaseUrl('http://admin.hvz.b.local');
  // RestangularProvider.setDefaultHeaders({'Access-Control-Allow-Origin': true});

}])

.run(['$rootScope', 'session', function($rootScope, session){
  // Set the current user so that this information can be cached.
  console.log("Restarting app");
  $rootScope.currentUser = false;
  var currentUser = session.getCurrentUser();
  if (currentUser !== false) {
    currentUser
      .then(function(user){
        $rootScope.currentUser = user;
        console.log("Getting Current user");
        console.log($rootScope.currentUser);
      });
  }
}])
.controller('MainController', [function(){

}]);