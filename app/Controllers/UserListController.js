angular
  .module("WebApp")
  .controller("UserListController", function ($scope, $http) {
    // Inject $http
    $scope.users = []; // Initialize as an empty array

    $scope.searchText = "";

    $scope.searchUsers = function () {
      return $scope.users.filter(function (user) {
        return (
          user.name.toLowerCase().includes($scope.searchText.toLowerCase()) ||
          user.email.toLowerCase().includes($scope.searchText.toLowerCase()) ||
          user.mobile.includes($scope.searchText)
        );
      });
    };

    // Fetch user data from the backend
    $http
      .get("https://localhost:7184/api/User") // Replace with your API endpoint
      .then(
        function (response) {
          // Success - store the user data in $scope.users
          $scope.users = response.data; // Assuming your API returns an array of users
          console.log("Users from backend:", $scope.users);
        },
        function (error) {
          // Error fetching data
          console.error("Error fetching users:", error);
          alert("Error fetching users. Please try again later.");
        }
      );
  });
