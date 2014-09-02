var gulp = require('gulp'),
    options = require('../../gulpoptions'),
    g = require('gulp-load-plugins')({lazy: true});

var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');
var vinylSource  = require('vinyl-source-stream');

gulp.task('browserify', [], function() {
    'use strict';
    var bundler = browserify({
        //NOTE for use by watchify: cache, packageCache, fullPaths
        cache: {},
        packageCache: {},
        fullPaths: true,
        entries: [options.appFolder+'app.js'],
        //TODO figure out why debug=true causes a dist build to can AngularJs DI errors
        // debug: true
    });

    var bundle = function() {
        gulp.start('jshint');
        console.log('rebundle');
        bundleLogger.start();
        var stream = bundler
            .bundle()
            .on('error', handleErrors)
            .pipe(vinylSource('app.js'))
            .pipe(gulp.dest('./build/'));
        if (options.isAngularApp) {
            stream = stream
                .pipe(g.streamify(g.ngAnnotate()))
                .pipe(g.rename('app.annotated.js'))
                .pipe(gulp.dest('./build/'));
        }
        stream = stream
            .on('end', bundleLogger.end);
        return stream;
    };

    if (global.isWatching) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }

    return bundle();
});
