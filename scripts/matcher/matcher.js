var app = angular.module('matcher', []).controller('MainCtrl', function($scope) {

  $scope.leftString;
  $scope.rightString;
  $scope.exact = [];

  $scope.match = function(){

    //bank left
    //receipts right

    $scope.bankResults = [];
    $scope.receiptResults = [];

    $scope.unique = [];
    $scope.conflicted = [];

    $scope.exact = [];
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
          $scope.exact.push(banks[i] + " : " + receipts[j]);
          banks.splice(i, 1);
          receipts.splice(j, 1);
        }     
      }
    }

    var usedForBank = [];
    var usedForReceipt = [];
    //fancy black magic for testing every combination
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
            var numList = [];
            for(var m = 0; m < combo.length; m++){
              usedForBank.push(combo[m]);
              numList.push(combo[m]);
            }
            usedForReceipt.push(total);
            $scope.bankResults.push([numList, total]);
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
            var numList = [];
            for(var m = 0; m < combo.length; m++){
              usedForReceipt.push(combo[m]);
              numList.push(combo[m]);
            }
            usedForBank.push(total);
            $scope.receiptResults.push([total,numList]);
          }
        }
      }
    }

    //finding the results that couldn't find a match on the left and the right side side
    $scope.unmatchedBank = [];
    for(var i = 0; i < banks.length; i ++){
      if(usedForBank.indexOf(banks[i]) === -1){
        $scope.unmatchedBank.push(banks[i]);
      }
    }
    $scope.unmatchedReceipts = [];
    for(var i = 0; i < receipts.length; i ++){
      if(usedForReceipt.indexOf(receipts[i]) === -1){
        $scope.unmatchedReceipts.push(receipts[i]);
      }
    }
    usedForBank = usedForBank.sort();
    usedForReceipt = usedForReceipt.sort();
    console.log(usedForBank);
    console.log(usedForReceipt);
    //finding the conflicting results, where numbers are used more than once

    var findDuplicate = function(value, array){
      for(var i = 0; i < array.length -1; i++){
        if(array[i+1] === array[i]){
          console.log(array[i])
          return true;
        }
      }
      return false;
    }

    for(var i = 0; i < $scope.bankResults.length; i ++){
      var foundDup = false;
      for(var j = 0; j < $scope.bankResults[i].length; j++){
        console.log($scope.bankResults[i][j]);
        if(findDuplicate($scope.bankResults[i][j], usedForBank)){
          foundDup = true;
        }
       }
      if(foundDup){
        $scope.conflicted.push($scope.bankResults[i])
      }
      else{
        $scope.unique.push($scope.bankResults[i]);
      }

    }

    for(var i = 0; i < $scope.receiptResults.length; i ++){
      var foundDup = false;
      for(var j = 0; j < $scope.receiptResults[i].length; j++){
        console.log($scope.receiptResults[i][j]);
        if(findDuplicate($scope.receiptResults[i][j], usedForReceipt)){
          foundDup = true;
        }
       }
      if(foundDup){
        $scope.conflicted.push($scope.receiptResults[i])
      }
      else{
        $scope.unique.push($scope.receiptResults[i]);
      }

    }


  }

})