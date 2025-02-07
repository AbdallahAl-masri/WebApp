angular.module("WebApp").controller("UserAddController", function ($scope) {
  $scope.users = [];

  $scope.newUser = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    photo: "",
  };

  $scope.addUser = function () {
    // Create a copy of the newUser object
    var user = angular.copy($scope.newUser);

    // Add the user to the users array
    $scope.users.push(user);

    // Reset the form
    $scope.newUser = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      photo: "",
    };

    // Log the added user (you can remove this in production)
    console.log("User added:", user);
    console.log("All users:", $scope.users);

    // Show a success message (you can customize this)
    alert("User added successfully!");
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
      } else if (phoneNumber.length <= 6) {
        return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
      } else {
        return (
          phoneNumber.slice(0, 3) +
          "-" +
          phoneNumber.slice(3, 6) +
          "-" +
          phoneNumber.slice(6)
        );
      }
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
});
