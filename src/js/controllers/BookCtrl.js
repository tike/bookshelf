'use strict';

angular.module('bookshelf')
  .controller('BookCtrl', ['$scope', '$log', '$routeParams', 'SearchSvc', function ($scope, $log, $routeParams, SearchSvc) {
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
            $scope.book = {
              "id":"541a1f106da8cc1e4df403fb",
              "title":"A Tour of C++",
              "subtitle":"",
              "description":"In A Tour of C++, Stroustrup excerpts the overview chapters from that complete reference, expanding and enhancing them to give an experienced programmer-in just a few hours–a clear idea of what constitutes modern C++. In this concise, self-contained guide, Stroustrup covers most major language features and the major standard-library components–not, of course, in great depth, but to a level that gives programmers a meaningful overview of the language, some key examples, and practical help in getting started.\n\nStroustrup presents the C++ features in the context of the programming styles they support, such as object-oriented and generic programming. His tour is remarkably comprehensive. Coverage begins with the basics, then ranges widely through more advanced topics, including many that are new in C++11, such as move semantics, uniform initialization, lambda expressions, improved containers, random numbers, and concurrency. The tour ends with a discussion of the design and evolution of C++ and the extensions added for C++11.",
              "authors":[{
                "firstname":"Bjarne",
                "middlename":"",
                "lastname":"Stroustrup"
              }],
              "edition":0,
              "year":2013,
              "tags":["C++", "Hadoop"],
              "publisher":"fooPublish",
              "isbn":9780321958310,
              "format":{
                "type":"Text",
                "pages":192,
                "index":true,
                "watermarked":false
              },
              "status":{
                "reviewed":false,
                "read":0
              },
              "source":{
                "name":"it-ebooks.info",
                "id":754025531,
                "url":"http://filepi.com/i/QZCx4bX"
              }
            };
          }
        );
  }
}]);