angular
  .module("WebApp")
  .controller(
    "LoginController",
    function ($scope, $http, $location, $rootScope) {
      $scope.email = "";
      $scope.password = "";

      $scope.submitForm = function () {
        $http
          .post("https://localhost:7184/api/user/login", {
            // Correct API endpoint
            email: $scope.email,
            password: $scope.password,
          })
          .then(
            function (response) {
              console.log("Login successful");
              localStorage.setItem("isAuthenticated", "true");
              $rootScope.isAuthenticated = true;
              $("body").addClass("authenticated");
              $location.path("/dashboard");
            },
            function (error) {
              console.error("HTTP error:", error);
              if (error.status === 400 || error.status === 401) {
                alert("Invalid email or password. Please try again.");
              } else {
                alert("An error occurred. Please try again later.");
              }
            }
          );
      };
    }
  );

$(document).ready(function () {
  $(".toggle-password").click(function () {
    var input = $(this).prev("input");
    var icon = $(this).find("i");

    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("bx-hide").addClass("bx-show");
    } else {
      input.attr("type", "password");
      icon.removeClass("bx-show").addClass("bx-hide");
    }
  });
});
