'use strict';

angular.module('bookshelf').
directive('tagFilter', function(){
  return {
    restrict: 'E',
    replace: true,
    //priority: 1200,
    scope: {
      label: '=',
      tags: '=',
      onDrag: '&',
      onDrop: '&',
    },
    template: '<div class="panel panel-default">' +
                '<div class="panel-heading">{{ label }}</div>' +
                '<div class="panel-body">' +
                  '<button class="btn btn-sm" ng-repeat="(tag, count) in tags"> {{ tag }} <span class="badge">{{ count }}</span></button>' +
                '</div>' +
              '</div>',
  };
});
