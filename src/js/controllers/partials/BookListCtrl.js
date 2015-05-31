'use strict';

angular.module('bookshelf')
  .controller('BookListCtrl', ['$scope', '$log', '$modal', 'SearchSvc', function ($scope, $log, $modal, SearchSvc) {
    $scope.query = 'Hadoop';
    
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
      }
    );
    
    
    
    $scope.addTags = function(book){
      console.log('book tags:', book.tags);
      if (!book.tags){
        book.tags = [];
      }
      $modal.open({
        controller: 'TagUpdaterModalCtrl',
        templateUrl: '/views/partials/TagUpdaterModal.html',
        resolve: {
          tags: function(){
            return angular.copy(book.tags);
          }
        }
      }).result.then(function(tags){
       book.tags = tags;
       SearchSvc.upSert(book); 
      });
    };
}]);



