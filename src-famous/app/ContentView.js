'use strict';

var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var GridLayout = require('famous/views/GridLayout');

function ContentView() {
    View.apply(this, arguments);

    var data = this.options.data;

    var contentLayout = new GridLayout({
        dimensions: [1, data.length],
    });
    var contentSurfaces = data.map(function(d, idx) {
        return new Surface({
            content: '<a href="'+d.url+'">'+d.title+'</a>',
            size: [undefined, 60],
            properties: {
                backgroundColor: '#fce',
                border: '2px solid hsl('+(360 * idx / data.length)+', 50%, 50%)'
            },
        });
    });
    contentLayout.sequenceFrom(contentSurfaces);

    this.add(contentLayout);
}
ContentView.prototype = Object.create(View.prototype);
ContentView.prototype.constructor = ContentView;

ContentView.DEFAULT_OPTIONS = {
    data: [],
    size: [undefined, 800]
};

module.exports = ContentView;
