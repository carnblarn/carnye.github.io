var app = angular.module('matches', ['ngTable']).
controller('MainCtrl', function($scope, $http, $filter, ngTableParams) {

    // var data = [{"matchId": 1, "teamOne": "TongFu", "people": "177", "items": "0", "winner": "TongFu", "teamTwoOdds": 0, "teamOneOdds": 0, "teamTwo": "MUFC"}, {"matchId": 2, "teamOne": "iG", "people": "0", "items": "0", "winner": "iG", "teamTwoOdds": 0, "teamOneOdds": 0, "teamTwo": "TongFu"}];
var query;
$scope.$watch("filter.$", function(){
    $scope.tableParams.reload();
});
$scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            matchId: 'desc'     // initial sorting
        }
    }, {
        total: 3000, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            $http.get('resources/dotaData/data.json').success(function(incData) {
                console.log('Found Data');
               data  = incData;
               var filteredData = $filter('filter')(data, $scope.filter);
               var orderedData = params.sorting() ?
                                   $filter('orderBy')(filteredData, params.orderBy()) :
                                   filteredData;

               $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
             });

        }
    });

})