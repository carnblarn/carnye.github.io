var app = angular.module('matcher', []).controller('MainCtrl', function($scope) {

  $scope.leftString = "25.82, 377.16, -1074.97, 87.49, 26.4, 27.98, 216.22, 958.9, 475.42, 26.39, 74.0, 19.95, 170.82, 619.75, 223.64, 243.99, 166.35, 109.16, 23.44, 171.84, 719.0, 107.76, 187.16, -30.0, 10.0, 179.41, 134.78, 25.0, 469.56, 107.92, 82.35, 169.49, 109.98, 201.98, 89.97, 25.0, 25.0, 25.0, -7.94, 187.01, 133.19, 541.29, 159.96, 86.21, 51.34";
  // $scope.leftString = "243.99, 166.35";
  $scope.rightString = "377.16, 1175.12, 501.82, 87.49, 27.98, 26.39, 25.82, 790.57, 74.0, 19.99, 410.34, 107.76, -791.95, 10.0, 100.0, 516.17, -30.0, 187.16, 82.35, 1209.84, 169.49, 89.97, 107.92, 109.98, 379.36, 187.01, 137.55, 550.85, 502.2, 44.11, 428.94, 6.98, 16.17";
  $scope.exact = [];
  // damn floats
  var equals = function(a, b){
    return Math.abs(a - b) < .01
  }

  var printString = function(result){
    var string = "";
    if(result[0].constructor === Array){
      for(var i = 0; i < result[0].length; i++){
        string += result[0][i] + " + "
      }
      string += " : " + result[1];
    }
    else if(result[1].constructor === Array){
      string += result[0] + " : ";
      for(var i = 0; i < result[1].length; i++){
        string += result[1][i] + " + "
      }
    }
    return string;
  }

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
    for(var range = 2; range < 5; range++){
      var combos = itertools.list(itertools.combinations(banks, range));
      for(var k = 0; k < combos.length; k++){
        var total = 0;
        var combo = combos[k];
        for(var l = 0; l < combo.length; l++ ){
          total += combo[l];
        }
        console.log(total);
        for(var l = 0; l < receipts.length; l++){
          if(equals(receipts[l], total)){
            var numList = [];
            for(var m = 0; m < combo.length; m++){
              usedForBank.push(combo[m]);
              numList.push(combo[m]);
            }
            usedForReceipt.push(receipts[l]);
            $scope.bankResults.push([numList, receipts[l]]);
          }
        }
      }
    }

    for(var range = 2; range < 5; range++){
      var combos = itertools.list(itertools.combinations(receipts, range));
      for(var k = 0; k < combos.length; k++){
        var total = 0;
        var combo = combos[k];
        for(var l = 0; l < combo.length; l++ ){
          total += combo[l];
        }
        for(var l = 0; l < banks.length; l++){
          if(equals(banks[l], total)){
            var numList = [];
            for(var m = 0; m < combo.length; m++){
              usedForReceipt.push(combo[m]);
              numList.push(combo[m]);
            }
            usedForBank.push(receipts[l]);
            $scope.receiptResults.push([receipts[l],numList]);
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
    //finding the conflicting results, where numbers are used more than once

    var findDuplicate = function(value, array){
      for(var i = 0; i < array.length -1; i++){
        if(array[i+1] === array[i]){
          return true;
        }
      }
      return false;
    }

    for(var i = 0; i < $scope.bankResults.length; i ++){
      var foundDup = false;
      for(var j = 0; j < $scope.bankResults[i].length; j++){
        if(findDuplicate($scope.bankResults[i][j], usedForBank)){
          foundDup = true;
        }
       }
      if(foundDup){
        $scope.conflicted.push(printString($scope.bankResults[i]))
      }
      else{
        $scope.unique.push(printString($scope.bankResults[i]));
      }

    }

    for(var i = 0; i < $scope.receiptResults.length; i ++){
      var foundDup = false;
      for(var j = 0; j < $scope.receiptResults[i].length; j++){
        if(findDuplicate($scope.receiptResults[i][j], usedForReceipt)){
          foundDup = true;
        }
       }
      if(foundDup){
        $scope.conflicted.push(printString($scope.receiptResults[i]));
      }
      else{
        $scope.unique.push(printString($scope.receiptResults[i]));
      }

    }


  }

})