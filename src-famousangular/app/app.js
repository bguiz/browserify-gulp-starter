/*globals angular*/

var app = angular.module('app', [
    'ngRoute',
    'famous.angular'
]);

app.config(function($routeProvider) {
    'use strict';
    $routeProvider.when('/fa', {
        templateUrl: 'fa/fa.html',
    })
    .otherwise({
        redirectTo: '/fa'
    });
});

//NOTE Be sure to precede every function exported and added to this module with /* @ngInject */
//This is an explicit hint to ng-annotate, and is required,
//because comprehending and traversing the browserify-ed commonJS modules is beyond the scope of ng-annotate
//If this is not done, AngularJs' dependency injection will fail on minified builds
//See https://docs.angularjs.org/tutorial/step_05#a-note-on-minification
app.controller('FaCtrl', require('./fa/fa-ctrl'));
