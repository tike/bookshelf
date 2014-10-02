'use strict';

angular
  .module('bookshelf',[
    'ngRoute',
    'ui.bootstrap',
    'ngDraggable',
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        OpenToPublic: true,
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
