var app = angular.module('spotify', []).
controller('MainCtrl', function($scope, $http) {
  $scope.gender;
  $scope.age;
  $scope.customTrackList = {};
  function initCustom(){
    $http.get('customTracks.json.json').
    success(function(data, status, headers, config) {
      $scope.customTrackList = data;
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      // log error
    });
  }
  initCustom();

});