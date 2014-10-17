var app = angular.module('matches', ['ui.grid']).
controller('MainCtrl', function($scope, $http, $filter) {

    $scope.matches = [{"matchId": 1, "teamOne": "TongFu", "people": "177", "items": "0", "winner": "TongFu", "teamTwoOdds": 0, "teamOneOdds": 0, "teamTwo": "MUFC"}, {"matchId": 2, "teamOne": "iG", "people": "0", "items": "0", "winner": "iG", "teamTwoOdds": 0, "teamOneOdds": 0, "teamTwo": "TongFu"}];
    $http.get('resources/dotaData/data.json').success(function(data) {
        console.log('Found Data');
       $scope.matches = data;
     });


})