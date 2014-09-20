'use strict';

var app = angular.module('responses', []);

app.controller('MainCtrl', function($scope, $http, $window) {
    $scope.comments;
    $http.get('scripts/data.txt').success(function(data) {
        console.log('updated');
       $scope.comments = data;
     });
});
