 'use strict';

        var app = angular.module('userRank', []);

        app.controller('MainCtrl', function($scope, $http, $window) {
            var baseline = 1500;
            $scope.pieces = [{
                image:'http://i.imgur.com/AWlAV9a.jpg',
                title: 'Fall in Virginia',
                finalScore: 2617,
                index: 0
            },
            {
                image:'http://i.imgur.com/LQ4d15U.jpg',
                title: 'Home library',
                finalScore: 27,
                index: 1
            },
            {
                image:'http://i.imgur.com/r2GeRYH.jpg',
                title: 'So the Pink Ranger is busking in Toronto right now',
                finalScore: 27,
                index: 2
            },
            {
                image:'http://i.imgur.com/6T8gGG1.jpg',
                title: 'Fall at the great wall',
                finalScore: 27,
                index: 3
            },
            {
                image:'http://i.imgur.com/UcWHOZQ.jpg',
                title: 'Sugar, sitting for her portrait',
                finalScore: 27,
                index: 4
            },
            {
                image:'http://i.imgur.com/xHwml3j.jpg',
                title: 'Nothing special, just thought my street looked nice tday',
                finalScore: 27,
                index: 5
            },
            {
                image:'http://max.distractify.com/wp-content/uploads//2014/06//lichtenstein-castle-ryan-wyckoff.jpg',
                title: 'Lichtenstein Castle in Germany',
                finalScore: 27,
                index: 6
            },
            {
                image:'http://i.imgur.com/daHiSHM.jpg',
                title: 'My favourite photo from my trip to Afria earlier this year',
                finalScore: 27,
                index: 7
            },
            {
                image:'http://i.imgur.com/3j3Ravd.jpg',
                title: 'Zoom burst firework',
                finalScore: 27,
                index: 8
            },

            ];
            $scope.click = function(index, stance){
                if(stance == 0){
                    return;
                }
                $scope.weight += stance * ($scope.pieces[index].finalScore - baseline) * .4/baseline;
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
