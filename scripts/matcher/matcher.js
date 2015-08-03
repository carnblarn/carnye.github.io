var app = angular.module('matcher', []).controller('MainCtrl', function($scope) {

  $scope.leftString;
  $scope.rightString;
  $scope.results = [];

  $scope.match = function(){
    $scope.results = [];
    var banks = $scope.leftString.split(',');
    var receipts = $scope.rightString.split(',');
    for(var i = 0; i < banks.length; i++){
      banks[i] = parseFloat(banks[i]);
    }
    for(var i = 0; i < receipts.length; i++){
      receipts[i] = parseFloat(receipts[i]);
    }

    //removing exact matches first
    var i = banks.length;
    while( i -- ){
      var j = receipts.length;
      while( j -- ){
        if(banks[i] === receipts[j]) {
          $scope.results.push(banks[i] + " : " + receipts[j]);
          banks.splice(i, 1);
          receipts.splice(j, 1);
        }     
      }
    }
    for(var range = 2; range < 6; range++){
      var combos = itertools.list(itertools.combinations(banks, range));
      for(var k = 0; k < combos.length; k++){
        var total = 0;
        var combo = combos[k];
        for(var l = 0; l < combo.length; l++ ){
          total += combo[l];
        }
        for(var l = 0; l < receipts.length; l++){
          if(receipts[l] === total){
            sumString = "";
            for(var m = 0; m < combo.length; m++){
              sumString += combo[m] + " + ";
            }
            //get rid of the last plus
            $scope.results.push(sumString + ": " + total);
          }
        }
      }
    }

    for(var range = 2; range < 6; range++){
      var combos = itertools.list(itertools.combinations(receipts, range));
      for(var k = 0; k < combos.length; k++){
        var total = 0;
        var combo = combos[k];
        for(var l = 0; l < combo.length; l++ ){
          total += combo[l];
        }
        for(var l = 0; l < banks.length; l++){
          if(banks[l] === total){
            sumString = "";
            for(var m = 0; m < combo.length; m++){
              sumString += combo[m] + " + ";
            }
            //get rid of the last plus
            $scope.results.push(total + ": " + sumString);
          }
        }
      }
    }



  }

})