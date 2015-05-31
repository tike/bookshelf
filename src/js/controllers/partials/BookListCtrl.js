'use strict';

angular.module('bookshelf')
  .controller('BookListCtrl', ['$scope', '$log', '$modal', 'SearchSvc', function ($scope, $log, $modal, SearchSvc) {
    // keep num active tags to simplifiy/shortcut filtering in $scope.byTags
    var activeTags = 0;
    
    // start init sequence
    $scope.orderByField = ['-year', 'pages' ];
    $scope.reverseSort = false;
    $scope.filterCond = {};

    SearchSvc.search({ 'title': 'Hadoop' }).then(
      function(resp){
        angular.extend($scope, resp.data);
      },
      function(data){
        $log.error('SearchSvc', data);
      }
    );
    
    // end init sequence ...
    
    $scope.star = function(book){
      book.status ? book.status.starred = !book.status.starred : book.status = {starred: true};
      SearchSvc.upSert(book);
    };
    
    $scope.checkTags = function(tag){
      tag.active = !tag.active;
      tag.active ? activeTags++ : activeTags--;
      $log.debug('num Tags:', tag.active, activeTags);
    };
    
    $scope.byTags = function(book, idx){
      if (activeTags === 0){
        return true;
      }
      
      for (var i=0; i<book.tags.length; i++){
        var selectedTag = $scope.tags[book.tags[i]]
        if( selectedTag && selectedTag.active){
          return true;
        }
      }
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



