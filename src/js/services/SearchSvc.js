'use strict';

angular.module('bookshelf')
  .factory('SearchSvc', ['$http', '$log', '$q', function ($http, $log, $q) {
    // Service logic
    // ...
    // The request config to be used for the query
    function getHttpConf(){
      return {
        method: 'GET',
        url: '/api/search',  
      };
    }
    
    // Stores the found items after successfull search
    var foundItems = [];

    // Public API here
    return {
      // query is meant to be an object
      search: function (query) {
        var defered = $q.defer();

        var conf = getHttpConf();
        conf.params = query;
        
        $http(conf).
        success(function(data, status, headers, config){
          $log.debug('SeSvc: success', status, data, headers(), config);
          defered.resolve(data)
        }).
        error(function(data, status, headers){
          $log.error('SeSvc: search error', data, status, headers());
          switch(status){
            default:
              break;
          }
          defered.reject(data);
        });
        $log.debug('SeSvc: search ended');
        return defered.promise;
      },
    };
  }]);
