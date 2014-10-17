var app = angular.module('matches', ['ngTable']).
controller('MainCtrl', function($scope, $http, ngTableParams) {

    $scope.matches;
    $http.get('resources/dotaData/data.json').success(function(data) {
        console.log('Found Data');
       $scope.matches = data;
     });
    $scope.tableParams = new ngTableParams({
        sorting: {
            matchId: 'desc'     // initial sorting
        }
    }, {
        total: $scope.matches.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

})