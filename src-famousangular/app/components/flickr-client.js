/*globals angular*/
'use strict';

var app = angular.module('app',
  ['ngAnimate', 'ngCookies',
    'ngTouch', 'ngSanitize',
    'ngResource', 'ui.router',
    'famous.angular' ])
  .config(
    /* @ngInject */ function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'components/main/main.html',
          controller: 'MainCtrl'
        });
      $urlRouterProvider.otherwise('/');
    }
  )
;

module.exports = app;
