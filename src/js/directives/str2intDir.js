'use strict';

angular.module('bookshelf').
directive('str2int', function(){
  return {
    restrict: 'A',
    require: 'ngModel',

    link: function(scope, iElem, iAttr, ngModel){
      ngModel.$parsers.push(function(value){
        return parseInt(value, 10);
      });
    }
  };
});