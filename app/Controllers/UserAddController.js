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

            // Check the response for success (e.g., HTTP status 200 or a specific success message)
            if (response.status === 200 || response.data.success === true) {
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
        var formattedValue = formatPhoneNumber(value);
        input.val(formattedValue);
      });

      // Format phone number as user types
      function formatPhoneNumber(phoneNumber) {
        if (phoneNumber.length <= 3) {
          return phoneNumber;
        }

        if (phoneNumber.length <= 6) {
          return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
        }

        return (
          phoneNumber.slice(0, 2) +
          " " +
          phoneNumber.slice(2, 6) +
          " " +
          phoneNumber.slice(6)
        );
      }

      // Password strength indicator (you can customize this)
      $("#password").on("input", function () {
        var password = $(this).val();
        var strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;

        var strengthText = "";
        switch (strength) {
          case 0:
          case 1:
          case 2:
            strengthText = "Weak";
            break;
          case 3:
            strengthText = "Medium";
            break;
          case 4:
          case 5:
            strengthText = "Strong";
            break;
        }
        $("#password-strength").text("Password Strength: " + strengthText);
      });
    });
  });
