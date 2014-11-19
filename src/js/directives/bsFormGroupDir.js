'use strict';

angular.module('bookshelf').
directive('bsFormGroup', function($log){
  return {
    restrict: 'E',
    require: '^form',
    replace: true,
    transclude: true,
    scope: {
    //  cssClas: '=class',
      input: '=bsInput',
      label: '=bsLabel',
    },
    template: '<div id="input.$name" class="form-group" ng-class="{' +
                  "'has-error': input.$dirty && input.$invalid," +
                  "'has-feedback\': input.$dirty && input.$invalid," +
                  "'has-success': input.$dirty && input.$valid," +
                '}">' +
                '<label for="input.$name">{{ label }}</label>' +
                '<div ng-transclude></div>' +
              '</div>',
    link: function(scope, el, atr, formCtrl){
      $log.debug(scope);
    },
  };
});
