var app = angular.module('spotify', []).
controller('MainCtrl', function($scope, $http) {
  $scope.gender;
  $scope.age;
  $scope.customTrackList = {};
  function initCustom(){
    var responsePromise = $http.get("resources/spotify/customTracks.json");
    responsePromise.success(function(data, status, headers, config) {
        $scope.customTrackList = data;
        console.log($scope.customTrackList.length);
        for(var i = 0; i < $scope.customTrackList; i++){
          console.log($scope.customTrackList[i][0]);
        }
    });
    responsePromise.error(function(data, status, headers, config) {
       console.log("AJAX failed!");
    });
  }
  initCustom();

});