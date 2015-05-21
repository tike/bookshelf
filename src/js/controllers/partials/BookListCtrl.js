'use strict';

angular.module('bookshelf')
  .controller('BookListCtrl', ['$scope', '$log', 'SearchSvc', function ($scope, $log, SearchSvc) {
    $scope.query = 'foobar';
    
    $scope.reviewed = 0;
    $scope.read = 0;

    // sorting
    $scope.orderByField = ['-year', 'pages' ];
    $scope.reverseSort = false;

    $scope.tags = {
      C: 5,
      'C++': 8,
      Python: 10,
      Perl: 3,
      'C#': 7,
    };
    $log.debug('Tags:', $scope.tags);

    SearchSvc.search({ 'title': 'Hadoop' }).then(
      function(resp){
        $scope.books = resp.data.books;
        $scope.reviewed = resp.data.reviewed;
        $scope.read = resp.data.read;
        $scope.tags = resp.data.tags;
        $log.info('got:', $scope.books.length, 'books');
      },
      function(data){
        $log.error('SearchSvc', data);
      });
}]);



