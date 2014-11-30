var app = angular.module('spotify', []).
controller('MainCtrl', function($scope, $http) {
  $scope.gender;
  $scope.age;
  $scope.customTrackList = {};
  $scope.customizedTracks;
  $scope.$watch('age', function(){
    if(($scope.age !== undefined) && ($scope.gender !== undefined)){
      $http.get('customTracks' + ($scope.age + $scope.gender) + 'json').
      success(function(data, status, headers, config) {
        $scope.customTrackList = data;
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        // log error
      });
    }
  });

});