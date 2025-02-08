angular
  .module("WebApp")
  .controller("ImportController", function ($scope, $http, $timeout) {
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

          $scope.status = "Uploading data in batches...";
          processData(jsonData, startTime);
        };

        reader.readAsArrayBuffer(file);
      }
    };

    function processData(data, startTime) {
      var batchSize = 50000;
      var currentIndex = 0;
      var totalBatches = Math.ceil(data.length / batchSize); // Calculate total batches
      var processedBatches = 0;

      function processBatch() {
        var endIndex = Math.min(currentIndex + batchSize, data.length);
        var batch = data.slice(currentIndex, endIndex);

        $http
          .post("https://localhost:7184/api/user/import", batch) // Send batch to backend
          .then(
            function (response) {
              // Success
              if (response.status === 200) {
                // Check the status code!
                $scope.processedBatches++;
                $scope.progress =
                  ($scope.processedBatches / totalBatches) * 100;
                $scope.processedRecords += batch.length;

                if (currentIndex < data.length - batchSize) {
                  currentIndex = endIndex;

                  processBatch();
                } else {
                  var endTime = new Date().getTime();
                  $scope.timeTaken = ((endTime - startTime) / 1000).toFixed(2);
                  $scope.status = "Import complete!";
                  $scope.showSummary = true;
                }
              } else {
                console.error(
                  "Unexpected status code:",
                  response.status,
                  response.data
                ); // Log the actual status and data
                $scope.status = "Error during import. Unexpected response.";
              }
            },
            function (error) {
              // Error
              console.error("HTTP error:", error.status, error.data); // Log the HTTP error details
              $scope.status = "Error during import. HTTP error.";
            }
          );
      }

      processBatch();
    }
  });
