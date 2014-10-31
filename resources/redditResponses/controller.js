'use strict';

var app = angular.module('responses', []);
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

app.controller('MainCtrl', function($scope, $http, $window) {
    $scope.comments;
    $http.get('scripts/data.txt').success(function(data) {
        console.log('updated');
       $scope.comments = shuffle(data);
     });
});
