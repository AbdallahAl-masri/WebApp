angular
  .module("WebApp", []) // Define the module (crucial!)
  .controller("LoginController", function ($scope, $http) {
    // Remove $location
    $scope.email = "";
    $scope.password = "";

    $scope.submitForm = function () {
      $http
        .post("https://localhost:7184/api/User/login", {
          // Replace with your API endpoint
          email: $scope.email,
          password: $scope.password,
        })
        .then(
          function (response) {
            // Success (200 OK)
            console.log("Response from backend (Success):", response.data);
            // Redirect using JavaScript (Correct for standalone page)
            window.location.href = "add-user.html"; // Or the appropriate URL and path
          },
          function (error) {
            // Error
            console.error("HTTP error:", error);
            if (error.status === 400) {
              alert("Invalid email or password. Please try again.");
            } else {
              alert("An error occurred. Please try again later.");
            }
          }
        );
    };

    // Toggle password visibility
    $(".toggle-password").click(function () {
      var input = $(this).prev("input");
      if (input.attr("type") === "password") {
        input.attr("type", "text");
        $(this).text("Hide");
      } else {
        input.attr("type", "password");
        $(this).text("Show");
      }
    });
  });
