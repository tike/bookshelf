'use strict';

angular.module('bookshelf')
  .factory('TagFilterSvc', ['$log', function(){
    
    var tags = [];
    
    return {
      addTag: function(newTag){
        var added = false;
        for (var i=0; i<tags.length; ++i){
          if (tags[i].name === newTag){
            tags[i].count++;
            added = true;
            break;
          }  
        }
        if (!added){
          tags.push({name: newTag, count: 1});
        }
      },
    };
 }]);
