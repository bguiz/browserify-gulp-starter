/*globals*/
'use strict';

/**
 * @ngdoc directive
 * @name photo-cube
 * @module flickr-client
 * @restrict EA
 * @description
 * This directive is used to show a cube of photos along with information
 * about them
 */

/* @ngInject */ module.exports = function ($famous, $famousDecorator) {
    return {
      templateUrl: 'components/photo-cube/photo-cube.html',
      scope: true,
      controller: 'PhotoCubeCtrl',
      restrict: 'EA',
      compile: function(/*tElement, tAttrs, transclude*/){

        return {
          pre: function(scope /*, element, attrs*/){
            $famousDecorator.ensureIsolate(scope);
          },
          post: function(scope, element, attrs){
            scope.photo = scope.$eval(attrs.photo);
          }
        };
      }
    };
  };
