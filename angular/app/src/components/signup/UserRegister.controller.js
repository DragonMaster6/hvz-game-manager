angular.module('UserRegister')
  .controller('UserRegisterController', ['$location', '$rootScope', '$sanitize', '$sce', '$scope', 'basicPageResource', 'session', 'userResource', function($location, $rootScope, $sanitize, $sce, $scope, basicPageResource, session, userResource){
    // First check if the user is logged in. If so, redirect to dashboard.
    if ($rootScope.currentUser) {
      $location.path('/dashboard');
    }

    if (session.getSession()) {
      $location.path('/dashboard');
    }

    // Records any error messages from Drupal.
    $scope.apiMsg = '';

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

    // Submits the form values to Drupal to create a new user.
    $scope.createAccount = function(form) {
      console.log("Form", form);
      // The form is clean and good so create a packet and send to the API
      var data = {
        "name": {"value": form.userName.$viewValue},
        "pass": {"value": form.userPass.$viewValue},
        "mail": {"value": form.email.$viewValue},
      };

      // Send the data to create a user.
      userResource.createUser(data)
        .then(function(response) {
          // User was created successfully, log the user in and redirect to dashboard.
          session.login(data.name.value, data.pass.value)
            .then(function(data) {
              // Create a new session and redirect back to the home page.
              session.create(data.current_user.uid, data.csrf_token, data.logout_token);
              $location.path('/');
            })
            .catch(function(data){
              $scope.message = "Login Failed";
            });
        })
        .catch(function(response) {
          console.log("FAILED!", response);
          switch(response.status) {
            case 500:
              $scope.apiMsg = 'Unable to process your request at this time. Please try again soon';
              break;
            case 422:
              // Unable to process the object mainly because it already exists.
              $scope.apiMsg = 'Unable '
          }
        });
    }
  }]);
