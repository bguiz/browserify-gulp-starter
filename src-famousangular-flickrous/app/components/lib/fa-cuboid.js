/*globals angular*/
'use strict';

var Modifier = require('famous/core/Modifier');
// var Surface = require('famous/core/Surface');
var RenderNode = require('famous/core/RenderNode');
var Transform = require('famous/core/Transform');
/**
 * @ngdoc directive
 * @name faCuboid
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to create reusable cuboid (rectangular prism) shapes
 * with arbitrary content
 * The order of the faces is [Front, Top, Right, Bottom, Left, Back]
 * Order can be managed/enforced with `fa-index`
 */


 //TODO:  This file is a pre-release version of fa-cuboid that's not yet available in the core library.
 //       Once it's available, remove this lib folder and just use Famo.us/Angular's fa-cuboid

/* @ngInject */ module.exports = function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){

        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);


            //TODO:  manage origin and align?  will this be necessary?

            var _dimens = scope.$eval(attrs.faDimensions);


            var PI_OVER_2 = Math.PI / 2;
            var PI = Math.PI;
            var _faceSpecs = [
              /*front */ {origin: [0,0], translate: [0,0,0], rotate: [0,0,0], size: [_dimens[0], _dimens[1]]},
              /*top   */ {origin: [0,0], translate: [0,0,-_dimens[2]], rotate: [PI_OVER_2, 0, 0], size: [_dimens[0], _dimens[2]]},
              /*right */ {origin: [0,0], translate: [_dimens[0],0,0], rotate: [0, PI_OVER_2, 0], size: [_dimens[2], _dimens[1]]},
              /*bottom*/ {origin: [0,0], translate: [0,_dimens[1],0], rotate: [-PI_OVER_2, 0, 0], size: [_dimens[0], _dimens[2]]},
              /*left  */ {origin: [0,0], translate: [0,0,-_dimens[2]], rotate: [0, -PI_OVER_2, 0], size: [_dimens[2], _dimens[1]]},
              /*back  */ {origin: [0,0], translate: [_dimens[0],0,-_dimens[2]], rotate: [0, PI, 0], size: [_dimens[0], _dimens[1]]}
            ];

            //non-performant hack to support updates to fa-dimensions
            scope.$watchCollection(function(){
              return scope.$eval(attrs.faDimensions);
            }, function(newVal/*, oldVal*/){
              _dimens = newVal;
              _faceSpecs = [
                /*front */ {origin: [0,0], translate: [0,0,0], rotate: [0,0,0], size: [_dimens[0], _dimens[1]]},
                /*top   */ {origin: [0,0], translate: [0,0,-_dimens[2]], rotate: [PI_OVER_2, 0, 0], size: [_dimens[0], _dimens[2]]},
                /*right */ {origin: [0,0], translate: [_dimens[0],0,0], rotate: [0, PI_OVER_2, 0], size: [_dimens[2], _dimens[1]]},
                /*bottom*/ {origin: [0,0], translate: [0,_dimens[1],0], rotate: [-PI_OVER_2, 0, 0], size: [_dimens[0], _dimens[2]]},
                /*left  */ {origin: [0,0], translate: [0,0,-_dimens[2]], rotate: [0, -PI_OVER_2, 0], size: [_dimens[2], _dimens[1]]},
                /*back  */ {origin: [0,0], translate: [_dimens[0],0,-_dimens[2]], rotate: [0, PI, 0], size: [_dimens[0], _dimens[1]]}
              ];
              _resequenceChildren();
            });


            var _root = new RenderNode();
            var _faces = [new RenderNode(),new RenderNode(),new RenderNode(),new RenderNode(),new RenderNode(),new RenderNode()];
            angular.forEach(_faces, function(face){_root.add(face);});

            var _children = [];

            var _resequenceChildren = function(){
              scope.$$postDigest(function(){
                var sequence = [];

                //first pass, populate specific indexes into their preferred spots
                angular.forEach(_children, function(child/*, i*/){
                  if(child.index !== undefined){
                    if(sequence[child.index] !== undefined) {
                        throw new Error('Multiple children have the same index (' + child.index + ')');
                    }
                    sequence[child.index] = child;
                  }
                });

                var counter = 0;
                //second pass, fill out the rest
                angular.forEach(_children, function(child/*, i*/){
                  //do not include if already sequenced
                  if(sequence.indexOf(child) === -1){
                    while(sequence[counter] !== undefined) { counter++; }
                    sequence[counter] = child;
                  }
                });

                //now the sequence is in the correct order:  assign each rendernode to the _faces' rendernodes
                angular.forEach(sequence, function(child, i){
                  if(child === undefined) { return; }

                  var spec = _faceSpecs[i];

                  var _mod = new Modifier({
                    origin: function(){return spec.origin;},
                    align: function(){return [0, 0];},
                    transform: function(){
                      var trans = Transform.multiply(Transform.translate.apply(this, spec.translate), Transform.rotate.apply(this, spec.rotate));
                      return trans;
                    },
                  });

                  var _face = new RenderNode().add(_mod);
                  _face.add(child.renderNode);
                  _faces[i].set(_face);

                });

              });

            };

            isolate.renderNode = _root;
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            $famousDecorator.sequenceWith(scope, function(data) {
              _children.push(data);
              _resequenceChildren();
            }, function(childScopeId) {
              _children = (function(_children) {
                var _ch = [];
                angular.forEach(_children, function(c) {
                  if (c.id !== childScopeId) {
                    _ch.push(c);
                  }
                });
                return _ch;
              })(_children);
              _resequenceChildren();
            }, _resequenceChildren);

            _resequenceChildren();


          },
          post: function(scope, element /*, attrs*/){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  };
