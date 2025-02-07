var app = angular.module("WebApp", []);

app.controller("UserController", function ($scope) {
  $scope.users = [
    {
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "+1 (555) 123-4567",
      password: "P@ssw0rd123",
    },
    {
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "+1 (555) 987-6543",
      password: "Str0ngP@ss!",
    },
    {
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      mobile: "+1 (555) 246-8135",
      password: "S3cur3P@ssword",
    },
    {
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Brown",
      email: "emily.brown@example.com",
      mobile: "+1 (555) 369-2580",
      password: "MyP@ssw0rd!",
    },
  ];

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
});

$(document).ready(function () {
  $(document).on("click", ".password", function () {
    var $this = $(this);
    var password = $this.data("password");
    if ($this.text() === "********") {
      $this.text(password);
    } else {
      $this.text("********");
    }
  });
});
