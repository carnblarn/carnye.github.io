var app = angular.module('matches', ['ngTable']).
controller('MainCtrl', function($scope, $http, $timeout, $resource, $filter, ngTableParams) {

    // var data = [{"matchId": 1, "teamOne": "TongFu", "people": "177", "items": "0", "winner": "TongFu", "teamTwoOdds": 0, "teamOneOdds": 0, "teamTwo": "MUFC"}, {"matchId": 2, "teamOne": "iG", "people": "0", "items": "0", "winner": "iG", "teamTwoOdds": 0, "teamOneOdds": 0, "teamTwo": "TongFu"}];
    var Api = $resource('resources/dotaData/data.json');
$scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            matchId: 'desc'     // initial sorting
        }
    }, {
        total: 0, // length of data
        getData: function($defer, params) {
            // use build-in angular filter

           Api.get(params.url(), function(data) {
                $timeout(function() {
                    // update table params
                    params.total(data.total);
                    // set new data
                    $defer.resolve(data.result);
                }, 500);
            });

        }
    });

})