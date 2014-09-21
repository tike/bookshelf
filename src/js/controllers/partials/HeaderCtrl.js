'use strict';

angular.module('bookshelf')
  .controller('HeaderCtrl',
    ['$scope', '$log', '$location',
      function ($scope, $log, $location) {
        
        // checks wether the provided path is the current location's path.
        $scope.isPath = function(position){
          return $location.path() === position ? true : false;
        };
}]);

