angular
  .module("WebApp")
  .controller(
    "MainController",
    function ($rootScope, $location, $timeout, $scope) {
      $rootScope.isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";

      $timeout(function () {
        $rootScope.isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
      }, 0);

      $rootScope.$on("$routeChangeStart", function () {
        if (!$rootScope.isAuthenticated) {
          $location.path("/login");
        }
      });

      $scope.isDropdownVisible = false;

      $scope.toggleDropdown = function () {
        $scope.isDropdownVisible = !$scope.isDropdownVisible;
      };

      $scope.logout = function () {
        localStorage.removeItem("isAuthenticated"); // Clear authentication status
        $rootScope.isAuthenticated = false;
        $location.path("/login"); // Redirect to login page
      };
    }
  );
