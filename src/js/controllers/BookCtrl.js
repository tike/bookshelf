'use strict';

angular.module('bookshelf')
  .controller('BookCtrl',
    ['$scope', '$log', '$routeParams', 'SearchSvc',
    function ($scope, $log, $routeParams, SearchSvc) {
  $log.debug('BookCtrl', $routeParams);
  
  if ($routeParams.id !== undefined){
    SearchSvc.
      byId($routeParams.id).
        then(
          function(resp){
            $scope.book = resp.data;
          },
          function(resp){
            $log.error('SearchSvc.ById returned:', resp.msg);
            $log.debug('SearchSvc.ById data:', resp.data);
          }
        );
  }
  
  $scope.submit = function(book, form){
    if (!form.$valid) {
      return;
    }
    SearchSvc.upSert(book);
  };
}]);