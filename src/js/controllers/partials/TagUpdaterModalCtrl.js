'use strict';

angular.
  module('bookshelf').
  controller('TagUpdaterModalCtrl',
    [ '$scope', '$log', '$modalInstance', 'tags',
    function($scope, $log, $modalInstance, tags){
      
      $scope.tags = tags;
      
      $scope.addTag = function(newTag, form){
        if (form.$invalid){
          return;
        }
        if (tags.indexOf(newTag) !== -1){
          return;
        }
        tags.push(newTag);
      };
      
      $scope.delete = function(idx, tag){
        $log.debug('delete', idx, tag);
        tags.splice(idx, 1);
      };
      
    
  }]);