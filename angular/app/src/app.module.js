'use strict';

// Declare app level module which depends on views, and components
angular.module('hvzGameManager', [
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'restangular',
  'UserRegister',
])

.config(['$httpProvider', '$locationProvider', '$routeProvider', 'RestangularProvider', function($httpProvider, $locationProvider, $routeProvider, RestangularProvider) {
  $locationProvider.hashPrefix('!');

  // Main View to display everything
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'src/app.template.html',
    })
    // User gets redirected here to their dashboard or their organization's dashboard.
    // .when('/dashboard', {
    //   controller:
    //   templateUrl:
    // })
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

  // To enable cookie based authentication, set withCredentials to true
  $httpProvider.defaults.withCredentials = true;

}])

.run(['$rootScope', 'session', 'userResource', function($rootScope, session, userResource){
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
  else {
    // anonymous user
    console.log("Root:Anonymous User");
  }
}])

.controller('MainController', ['$scope', 'basicPageResource', 'session', function($scope, basicPageResource, session){
  // Retrieve all front page nodes to be displayed.
  basicPageResource.getPage('front')
    .then(function(nodes) {
      $scope.nodes = [];
      for (var element in nodes.plain()) {
        $scope.nodes = $scope.nodes.concat(nodes[element]);
      }
    })
    .catch(function(data) {
      console.log('issue getting the front page');
    });

  // Logs the user out from the Drupal site
  $scope.userLogout = function() {
    console.log("Logging out");
    var request = session.logout();
    if (request != false) {
      // There is a promise, so process it
      request.then(function(data){
        console.log("Successfully logged out");
        session.delete();
      })
      .catch(function(data){
        console.log("Error: Unable to logout");
      });
    }
  }
}]);