'use strict';

//NOTE must call this just once, and it should be called before any
//famous library code is required or executed
//These polyfills are required for famous to work properly
require('./execute-famous-polyfills')();

var Engine = require('famous/core/Engine');
var Surface = require('famous/core/Surface');
var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var Utility = require('famous/utilities/Utility');
var ContentView = require('./ContentView');

var mainContext = Engine.createContext();
mainContext.setPerspective(200);

Utility.loadURL('http://www.reddit.com/r/node.json', loaded);

function loaded(data) {
    data = JSON.parse(data);
    var parsedData = data.data.children.map(function(c) {
        return {
            url: c.data.url,
            title: c.data.title,
        };
    });

    var headerSurface = new Surface({
        content: 'Hello World',
        classes: ['header-footer'],
        // properties: {
        //     backgroundColor: '#f66',
        //     lineHeight: '80px',
        //     textAlign: 'center',
        // },
    });
    var contentView = new ContentView({
        data: parsedData,
    });
    var footerSurface = new Surface({
        content: 'Footer',
        classes: ['header-footer'],
        // properties: {
        //     backgroundColor: '#f66',
        //     lineHeight: '80px',
        //     textAlign: 'center',
        // },
    });

    var layout = new HeaderFooterLayout({
        headerSize: 80,
        footerSize: 80,
        direction: 1,
    });

    layout.header.add(headerSurface);
    layout.content.add(contentView);
    layout.footer.add(footerSurface);
    mainContext.add(layout);
}
