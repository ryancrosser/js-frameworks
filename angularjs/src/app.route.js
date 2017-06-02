(function () {
   'use strict';
   
   angular
       .module('app')
       .config(routes)
    
   function routes($stateProvider,   $urlRouterProvider) {
      $urlRouterProvider
        // .when('/c?id', '/contacts/:id')
        .otherwise('/');

      $stateProvider
          .state('main', {
              url: '/',
              template: '<content></content>'
          }).state('another', {
              url: '/another',
              template: 'This is another page.'
          });
    }
})();
