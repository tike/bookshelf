'use strict';

angular.module('bookshelf')
  .controller('BookListCtrl', ['$scope', '$log', '$modal', 'SearchSvc', function ($scope, $log, $modal, SearchSvc) {

    $scope.orderByField = ['-year', 'pages' ];
    $scope.reverseSort = false;

    SearchSvc.search({ 'title': 'Hadoop' }).then(
      function(resp){
        angular.extend($scope, resp.data);
      },
      function(data){
        $log.error('SearchSvc', data);
      }
    );
    
    $scope.star = function(book){
      book.status ? book.status.starred = !book.status.starred : book.status = {starred: true};
      SearchSvc.upSert(book);
    };
    
    
    
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



