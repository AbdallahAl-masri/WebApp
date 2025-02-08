angular
  .module("WebApp")
  .controller("UserAddController", function ($scope, $http) {
    // Inject $http
    $scope.users = [];

    $scope.newUser = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      photo: "",
    };

    $scope.addUser = function () {
      var user = angular.copy($scope.newUser);

      $http
        .post("https://localhost:7184/api/User", user) // Replace with your API endpoint
        .then(
          function (response) {
            // Success - the user was created (and possibly authenticated)
            console.log("Response from backend:", response.data);
            console.log("Response from backend:", response.status);

            // Check the response for success (e.g., HTTP status 200 or a specific success message)
            if (response.status === 204) {
              // Adjust as needed
              $scope.users.push(user); // Add to local users array (if needed)
              $scope.newUser = {
                // Reset form
                name: "",
                email: "",
                mobile: "",
                password: "",
                photo: "",
              };
              alert("User added successfully!");
            } else {
              // Handle backend errors
              console.error("Backend error:", response.data);
              alert("Error adding user. Please try again.");
            }
          },
          function (error) {
            // Error during the HTTP request
            console.error("HTTP error:", error);
            alert("An error occurred. Please try again later.");
          }
        );
    };

    // jQuery function to add custom validation and formatting
    $(document).ready(function () {
      // Custom validation for mobile number
      $("#mobile").on("input", function () {
        var input = $(this);
        var value = input.val().replace(/\D/g, ""); // Remove non-digits
        if (value.length > 10) {
          value = value.slice(0, 10); // Limit to 10 digits
        }
        input.val(value);
      });
    });
  });
