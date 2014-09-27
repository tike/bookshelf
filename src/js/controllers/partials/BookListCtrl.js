'use strict';

angular.module('bookshelf')
  .controller('BookListCtrl', ['$scope', '$log', 'SearchSvc', function ($scope, $log, SearchSvc) {
  $log.debug('BookList');
  $scope.books = [];
  
  SearchSvc.search({}).then(
    function(data){
      $scope.books = data;
      $log.info('got:', data.length, 'books');
    },
    function(data){
      $log.error("SearchSvc", data);
    });
  
}]);



