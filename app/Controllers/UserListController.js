angular
  .module("WebApp")
  .controller("UserListController", function ($scope, $http, $rootScope) {
    $scope.users = [];
    $scope.searchText = "";
    $scope.itemsPerPage = 500;
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.pages = [];
    $scope.visiblePageCount = 5;

    function fetchUsers(page) {
      $http.get("https://localhost:7184/api/user/paginated?page=" + page).then(
        function (response) {
          $scope.displayedUsers = response.data.users;
          $scope.totalPages = response.data.totalPages || 1;
          updatePagination();
        },
        function (error) {
          console.error("Error fetching users:", error);
          alert("Error fetching users. Please try again later.");
        }
      );
    }

    function updatePagination() {
      $scope.startPage =
        Math.floor(($scope.currentPage - 1) / $scope.visiblePageCount) *
          $scope.visiblePageCount +
        1;
      $scope.endPage = Math.min(
        $scope.startPage + $scope.visiblePageCount - 1,
        $scope.totalPages
      );
      $scope.pages = Array.from(
        { length: $scope.endPage - $scope.startPage + 1 },
        (_, i) => $scope.startPage + i
      );
    }

    $scope.setPage = function (page) {
      if (page < 1 || page > $scope.totalPages) return;
      $scope.currentPage = page;
      fetchUsers(page);
    };

    $scope.previousPageBlock = function () {
      if ($scope.startPage > 1) {
        $scope.setPage($scope.startPage - 1);
      }
    };

    $scope.nextPageBlock = function () {
      if ($scope.endPage < $scope.totalPages) {
        $scope.setPage($scope.endPage + 1);
      }
    };

    $rootScope.$on("$viewContentLoaded", function () {
      if ($rootScope.isAuthenticated) {
        fetchUsers(1);
      }
    });

    $scope.$watch("searchText", function (newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.currentPage = 1;
        fetchUsers(1);
      }
    });
  });
