'use strict';

angular.module('bookshelf')
  .controller('tagContainerCtrl', ['$scope', '$log', function ($scope, $log) {
  $log.debug('tagContainerList');
  
  $scope.title = 'tagContainer';
  $scope.tags = [];
  
  $scope.onDropTag = function(data, event){
    $log.debug('onDropTag', $scope.title, data, event);
    $scope.tagsAll.push(data);
  };
  
  $scope.onDragTag = function(data, event){
    $log.debug('onDrapTag', $scope.title, data, event);
    var index = $scope.tags.IndexOf(data);
    if (index > -1){
      $scope.tags.Splice(index, 1);
    }
  };
  
}]);
