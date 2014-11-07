 'use strict';

        var app = angular.module('networks', []);

        app.controller('MainCtrl', function($scope, $http, $window) {
            var toBinary = function(decNum){
                var num =  parseInt(decNum,10).toString(2);
                while(num.length < 8){
                    num = "0" + num;
                }
                return num;
            };
            $scope.ipOne =   function(){
                var ip = toBinary($scope.one1)  + toBinary($scope.two1)  + toBinary($scope.three1)  + toBinary($scope.four1);
                for(var i = 0; i < ip.length; i++){
                    if(i >= parseInt($scope.five1, 10)){
                        ip = ip.substr(0, i) + "*";
                    }
                }
                while(ip.length < 32){
                    ip = ip + "*";
                }
                return ip;
            };
             $scope.ipTwo =   function(){
                var ip = toBinary($scope.a)  + toBinary($scope.b)  + toBinary($scope.c)  + toBinary($scope.d);
                for(var i = 0; i < ip.length; i++){
                    if(i >= parseInt($scope.e, 10)){
                        ip = ip.substr(0, i) + "*";
                    }
                }
                while(ip.length < 32){
                    ip = ip + "*";
                }
                return ip;
            };
        });
