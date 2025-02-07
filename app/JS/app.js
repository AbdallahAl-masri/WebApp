var app = angular.module('WebApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/add-user', {
      templateUrl: '../Views/add-user.html',
      
    })
    .when('/all-users', {
      templateUrl: '../Views/all-users.html',
      controller: 'UserController',
    })
    .when('/import-excel', {
      templateUrl: '../Views/import-excel.html',
    })
    .otherwise({ redirectTo: '/add-user' });

  // Enable hash-bang mode
  $locationProvider.hashPrefix('!');
});
