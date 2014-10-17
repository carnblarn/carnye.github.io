var app = angular.module('matches', ['ngTable']).
controller('MainCtrl', function($scope, $http, ngTableParams) {

    $scope.matches = [{"matchId": 1, "teamOne": "TongFu", "people": "177", "items": "0", "winner": "TongFu", "teamTwoOdds": 0, "teamOneOdds": 0, "teamTwo": "MUFC"}];
    // $http.get('resources/dotaData/data.json').success(function(data) {
    //     console.log('Found Data');
    //    $scope.matches = data;
    //  });
    $scope.tableParams = new ngTableParams({
        sorting: {
            matchId: 'desc'     // initial sorting
        }
    }, {
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

})