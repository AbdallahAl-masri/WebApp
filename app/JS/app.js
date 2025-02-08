var app = angular.module("WebApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "../Views/login.html",
      controller: "LoginController",
    })
    .when("/dashboard", {
      templateUrl: "../Views/dashboard.html",
    })
    .when("/add-user", {
      templateUrl: "../Views/add-user.html",
      controller: "UserAddController",
    })
    .when("/all-users", {
      templateUrl: "../Views/all-users.html",
      controller: "UserListController",
    })
    .when("/import-excel", {
      templateUrl: "../Views/import-excel.html",
      controller: "ImportController",
    })
    .otherwise({ redirectTo: "/dashboard" });

  // Enable hash-bang mode
  $locationProvider.hashPrefix("!");
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
