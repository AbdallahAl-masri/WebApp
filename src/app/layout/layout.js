var app = angular.module('dashboardApp', []);

    app.controller('MainController', function ($scope) {
      $scope.toggleSidebar = function () {
        $('.sidebar').toggleClass('hidden');
      };
    });