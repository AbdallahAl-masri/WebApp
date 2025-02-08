angular
  .module("WebApp")
  .controller("UserListController", function ($scope, $http, $rootScope) {
    // Inject $rootScope
    $scope.users = [];
    $scope.searchText = "";

    $scope.itemsPerPage = 500;
    $scope.currentPage = 1;
    $scope.displayedUsers = [];

    $scope.searchUsers = function () {
      if (Array.isArray($scope.users)) {
        return $scope.users.filter(function (user) {
          return (
            user.name.toLowerCase().includes($scope.searchText.toLowerCase()) ||
            user.email
              .toLowerCase()
              .includes($scope.searchText.toLowerCase()) ||
            user.mobileNumber.includes($scope.searchText)
          );
        });
      } else {
        return [];
      }
    };

    $scope.setPage = function (page) {
      if (page < 1 || page > $scope.totalPages) return; // Ensure page range is valid
      $scope.currentPage = page;
      updateDisplayedUsers();
    };

    function updateDisplayedUsers() {
      const startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
      const filteredUsers = $scope.searchUsers();
      const endIndex = Math.min(
        startIndex + $scope.itemsPerPage,
        filteredUsers.length
      );
      $scope.displayedUsers = filteredUsers.slice(startIndex, endIndex);
    }

    // Use $rootScope.$on('$viewContentLoaded') to ensure the view is loaded
    $rootScope.$on("$viewContentLoaded", function () {
      if ($rootScope.isAuthenticated) {
        // Check authentication again here
        $http.get("https://localhost:7184/api/user/paginated").then(
          function (response) {
            $scope.users = response.data.users;
            console.log("Users from backend:", $scope.users);
            console.log("Data: ", response.data);
            updatePagination();
          },
          function (error) {
            console.error("Error fetching users:", error);
            alert("Error fetching users. Please try again later.");
          }
        );
      }
    });

    function updatePagination() {
      const filteredUsers = $scope.searchUsers();
      $scope.totalPages = Math.ceil(filteredUsers.length / $scope.itemsPerPage);

      console.log("Filtered Users Count:", filteredUsers.length); // Check the count
      console.log("Items Per Page:", $scope.itemsPerPage); // Check this value
      console.log("Total Pages:", $scope.totalPages); // The crucial value

      if (
        isNaN($scope.totalPages) ||
        !isFinite($scope.totalPages) ||
        $scope.totalPages < 1
      ) {
        $scope.totalPages = 1; // Handle edge cases
      }

      $scope.pages = Array.from({ length: $scope.totalPages }, (_, i) => i + 1);
      updateDisplayedUsers();
    }

    $scope.$watch("searchText", function (newValue, oldValue) {
      if (newValue !== oldValue) {
        updatePagination();
        $scope.currentPage = 1;
      }
    });
  });
