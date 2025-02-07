angular.module("WebApp").controller("ImportController", [
  "$scope",
  "$timeout",
  function ($scope, $timeout) {
    $scope.progress = 0;
    $scope.status = "";
    $scope.showSummary = false;
    $scope.totalRecords = 0;
    $scope.processedRecords = 0;
    $scope.timeTaken = 0;

    $scope.uploadFile = function () {
      var fileInput = document.getElementById("excelFile");
      var file = fileInput.files[0];

      if (file) {
        $scope.status = "Reading file...";
        $scope.progress = 0;
        $scope.showSummary = false;

        var reader = new FileReader();
        reader.onload = function (e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, { type: "array" });
          var sheetName = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[sheetName];
          var jsonData = XLSX.utils.sheet_to_json(worksheet);

          $scope.totalRecords = jsonData.length;
          $scope.processedRecords = 0;

          var startTime = new Date().getTime();

          $scope.status = "Processing data...";
          processData(jsonData, startTime);
        };

        reader.readAsArrayBuffer(file);
      }
    };

    function processData(data, startTime) {
      var batchSize = 1000;
      var currentIndex = 0;

      function processBatch() {
        var endIndex = Math.min(currentIndex + batchSize, data.length);
        var batch = data.slice(currentIndex, endIndex);

        batch.forEach(function (user) {
          // Process user data and generate password
          user.password = generatePassword();
          $scope.processedRecords++;
        });

        currentIndex = endIndex;
        $scope.progress = (currentIndex / data.length) * 100;

        $timeout(function () {
          if (currentIndex < data.length) {
            processBatch();
          } else {
            var endTime = new Date().getTime();
            $scope.timeTaken = ((endTime - startTime) / 1000).toFixed(2);
            $scope.status = "Processing complete!";
            $scope.showSummary = true;
          }
        }, 0);
      }

      processBatch();
    }

    function generatePassword() {
      var length = 12;
      var charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      var password = "";
      for (var i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return password;
    }
  },
]);
