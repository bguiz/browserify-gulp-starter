var requireDir = require('require-dir');

global.isAngularApp = true;

global.htmlMinOptions = {
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: false,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true
};

requireDir('./gulpfiles/tasks', { recurse: true });
