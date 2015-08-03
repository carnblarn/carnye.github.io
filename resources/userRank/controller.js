 'use strict';

        var app = angular.module('userRank', []);

        app.controller('MainCtrl', function($scope, $http, $window) {

            $scope.devMode = false;
            var baseline = 1000;
            $scope.pieces = [{
                image:'http://i.imgur.com/AWlAV9a.jpg',
                title: 'Fall in Virginia',
                finalScore: 4428,
                index: 0
            },
           {
                image:'http://i.imgur.com/3j3Ravd.jpg',
                title: 'Zoom burst firework',
                finalScore: 10,
                index: 1
            },
            {
                image:'http://i.imgur.com/r2GeRYH.jpg',
                title: 'So the Pink Ranger is busking in Toronto right now',
                finalScore: 3812,
                index: 2
            },
            {
                image:'http://i.imgur.com/6T8gGG1.jpg',
                title: 'Fall at the great wall',
                finalScore: 867,
                index: 3
            },
            {
                image:'http://i.imgur.com/UcWHOZQ.jpg',
                title: 'Sugar, sitting for her portrait',
                finalScore: 368,
                index: 4
            },
             {
                image:'http://i.imgur.com/daHiSHM.jpg',
                title: 'My favourite photo from my trip to Afria earlier this year',
                finalScore: 34,
                index: 5
            },
            {
                image:'http://i.imgur.com/5xVcwMx.jpg',
                title: 'This is a picture of the sun. Note the magnetic field lines',
                finalScore: 1239,
                index: 6
            },
            {
                image:'http://i.imgur.com/Fs07ubx.jpg',
                title: 'Kasteel de Haar, Netherlands',
                finalScore: 1969,
                index: 7
            },
            {
                image:'http://i.imgur.com/q4WB9PY.jpg',
                title: 'who disturbs my slumber?!',
                finalScore: 682,
                index: 8
            },
            {
                image:'http://i.imgur.com/zQZ6F8I.jpg',
                title: 'Just Norway, being awesome',
                finalScore: 885,
                index: 9
            },

            {
                image:'http://i.imgur.com/Oywaoa1.jpg',
                title: 'The drought in the western US is no joke...',
                finalScore: 174,
                index: 10
            },


             {
                image:'http://i.imgur.com/LQ4d15U.jpg',
                title: 'Home library',
                finalScore: 4130,
                index: 11
            },

            ];
            $scope.click = function(index, stance){

                if(stance == 0){
                    return;
                }
                $scope.weight += stance * ($scope.pieces[index].finalScore - baseline) * .2/baseline;
                if($scope.weight <= .1){
                    $scope.weight = .1;
                }
                else if($scope.weight >= 5){
                    $scope.weight = 5;
                }
                $scope.weight = Math.round($scope.weight * 100) /100;

            };
            $scope.weight = 1;

        });
