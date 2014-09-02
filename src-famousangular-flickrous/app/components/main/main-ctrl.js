/*globals _*/
'use strict';

var Transitionable = require('famous/transitions/Transitionable');
// var Timer = require('famous/utilities/Timer');
var Easing = require('famous/transitions/Easing');
var EventHandler = require('famous/core/EventHandler');

/* @ngInject */ module.exports = function ($scope, $famous, flickr) {

    $scope.scrollHandler = new EventHandler();

    $scope.loading = false;
    $scope.loadPhotos = function(searchTerm){
      $scope.loading = true;
      var promise = flickr.getPhotoSearchList(searchTerm);
      promise.success(function(data){
        $scope.loading = false;
        $scope.photos = _.map(data.photos.photo, function(photo){
          var scale = new Transitionable([0.001, 0.001, 0.001]);
          var opacity = new Transitionable(0);
          return _.extend(photo, {
            url: flickr.getPhotoUrl(photo),
            scale: scale,
            opacity: opacity
          });
        });
      });
      promise.error(function(){
        console.log('API ERROR!', arguments);
      });
    };

    window.s = $scope;

    $scope.search = {
      term: 'cloudscape' //'macro flower', 'french bulldog'
    };

    var _scales = {};
    $scope.cubeEnter = function(photo, $done){
      photo.scale.set([1, 1, 1], {duration: 1000, curve: Easing.outElastic});
      photo.opacity.set(1, {duration: 1250, curve: 'linear'}, $done);
    };

    $scope.getScale = function(i){
      if(!_scales[i]) {
        return [1, 1, 1];
      }
    };


    $scope.updateSearch = function(){
      $scope.loadPhotos($scope.search.term);
    };

    $scope.updateSearch();

    $scope.photos = [];
};
