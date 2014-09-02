var gulp = require('gulp'),
    options = require('../../gulpoptions'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('build', ['vendor', 'styles', 'templates', 'browserify'], function() {
    'use strict';

    console.log('build');

    var vendorFiles = [
        './build/vendor.js',
        './build/vendor.css'
    ];
    var vendorFilesSrc = gulp.src(vendorFiles, { read: false });
    console.log('build vendorFilesSrc', vendorFiles);

    var appFiles = [
        './build/*.js',
        '!./build/vendor*.js',
        './build/*.css',
        '!./build/vendor*.css'
    ];
    if (options.isAngularApp) {
        //we want to use app.annotated.js instead of app.js
        appFiles.push('!./build/app.js');
    }
    var appFilesSrc = gulp.src(appFiles, { read: false });

    return gulp
        .src(options.appFolder+'index.html')
        .pipe(g.inject(vendorFilesSrc, {
            ignorePath: '/build/',
            starttag: '<!-- inject:vendor:{{ext}} -->',
            addRootSlash: false,
         }))
        //NOTE this should, but doesn't work, so we fall back on the more explicit startag
        // .pipe(g.inject(vendorFiles, { ignorePath: '/build', name: 'vendor' }))
        .pipe(g.inject(appFilesSrc, {
            ignorePath: '/build/',
            addRootSlash: false,
        }))
        .pipe(gulp.dest('./build/'));
});
