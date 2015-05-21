'use strict';

angular.module('bookshelf').
directive('bsFormGroup', function(){
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
    // jshint ignore:start
    template: '<div id="input.$name" class="form-group" ng-class="{' +
                  "'has-error': input.$touched && input.$invalid," +
                  "'has-feedback\': input.$touched && input.$invalid," +
                  "'has-success': input.$touched && input.$valid," +
                '}">' +
                '<label for="input.$name">{{ label }}</label>' +
                '<div ng-transclude></div>' +
              '</div>',
    // jshint ignore:end
  };
});
