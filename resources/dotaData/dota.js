var app = angular.module('matches', ['ngTable']).
controller('MainCtrl', function($scope, $http) {

    $scope.matches;
    $http.get('resources/dotaData/data.json').success(function(data) {
        console.log('Found Data');
       $scope.matches = data;
     });

})