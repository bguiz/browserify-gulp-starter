var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('build', ['vendor', 'styles', 'templates', 'browserify'], function() {
    'use strict';

    var vendorFiles = gulp.src([
        './build/vendor.js',
        './build/vendor.css'
    ], { read: false });
    var files = [
        './build/*.js',
        '!./build/vendor*.js',
        './build/*.css',
        '!./build/vendor*.css'
    ];
    if (global.isAngularApp) {
        //we want to use app.annotated.js instead of app.js
        files.push('!./build/app.js');
    }
    var appFiles = gulp.src(files, { read: false });

    return gulp
        .src('./src/app/index.html')
        .pipe(g.inject(vendorFiles, { ignorePath: '/build', starttag: '<!-- inject:vendor:{{ext}} -->' }))
        //NOTE this should, but doesn't work, so we fall back on the more explicit startag
        // .pipe(g.inject(vendorFiles, { ignorePath: '/build', name: 'vendor' }))
        .pipe(g.inject(appFiles, { ignorePath: '/build' }))
        .pipe(gulp.dest('./build/'));
});
