angular
  .module("WebApp") // Make sure "WebApp" is defined in app.js
  .controller(
    "LoginController",
    function ($scope, $http, $location, $rootScope) {
      $scope.email = "";
      $scope.password = "";
      $scope.loginError = null; // Initialize error message

      $scope.submitForm = function () {
        $scope.loginError = null; // Clear any previous errors

        $http
          .post("https://localhost:7184/api/user/login", {
            // Correct API endpoint
            email: $scope.email,
            password: $scope.password,
          })
          .then(
            function (response) {
              console.log("Login successful:", response.data);
              localStorage.setItem("isAuthenticated", "true");
              $rootScope.isAuthenticated = true;
              $("body").addClass("authenticated"); // Add the class
              $location.path("/add-user"); // Or wherever you want to redirect
            },
            function (error) {
              console.error("HTTP error:", error);
              if (error.status === 400 || error.status === 401) {
                // Check for 400 or 401
                $scope.loginError =
                  "Invalid email or password. Please try again.";
              } else {
                $scope.loginError =
                  "An error occurred. Please try again later.";
              }
            }
          );
      };
    }
  );
