'use strict';

angular.module('bookshelf')
  .factory('SearchSvc', ['$http', '$log', '$q', function ($http, $log, $q) {
    
    function doRequest(reqConfig){
      var defered = $q.defer();        
        $http(reqConfig).
        success(function(data, status, headers, config){
          $log.debug('SeSvc.doRequest: success', status, data,headers(), config);
          defered.resolve(data);
        }).
        error(function(data, status, headers){
          $log.error('SeSvc.doRequest: search error', data, status, headers());
          switch(status){
            default:
              break;
          }
          defered.reject(data);
        });
        $log.debug('SeSvc.doRequest: search ended');
        return defered.promise;
    }

    // Public API here
    return {
      // query is meant to be an object
      search: function (query) {
        return doRequest({
          method: 'GET',
          url: '/api/search',
          params: query,
        });
      },
      byId: function(id){
        return doRequest({
          method: 'GET',
          url: '/api/book/'.concat(id),
        });
      },
      upSert: function(book){
        return doRequest({
          method: 'PUT',
          url: '/api/book/'.concat(book.id),
          data: book,
        });
      },
    };
  }]);
