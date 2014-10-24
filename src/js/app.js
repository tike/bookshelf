'use strict';

angular
  .module('bookshelf',[
    'ngRoute',
    'ui.bootstrap',
    'ngDraggable',
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/book/:id/edit',{
        templateUrl: 'views/book.html',
        controller: 'BookCtrl',
      })
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
