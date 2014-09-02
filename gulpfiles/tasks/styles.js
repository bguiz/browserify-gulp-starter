var gulp = require('gulp'),
    options = require('../../gulpoptions'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('styles', [], function() {
    'use strict';
    return gulp
        .src(options.appFolder+'app.scss')
        .pipe(g.sass())
        .pipe(gulp.dest('./build/'))
        .pipe(g.cached('built-css'));
});
