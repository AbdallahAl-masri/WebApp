// AngularJS App
var app = angular.module('WebApp', []);

app.controller('LoginController', function($scope) {
  $scope.email = '';
  $scope.password = '';

  $scope.submitForm = function() {
    if ($scope.email && $scope.password) {
      alert('Login successful for: ' + $scope.email);
    } else {
      alert('Please fill in both fields.');
    }
  };
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'index.html',
          controller: 'LoginController'
      })
      .when('/userlist', {
          templateUrl: 'userlist.html',
          controller: 'UserListController',
      })
      .otherwise({
          redirectTo: '/'
      });
}]);

// jQuery for Toggle Password Visibility
$(document).ready(function () {
  $(".toggle-icon").on("click", function () {
    const passwordField = $("#password");
    const type =
      passwordField.attr("type") === "password" ? "text" : "password";
    passwordField.attr("type", type);
  });
});