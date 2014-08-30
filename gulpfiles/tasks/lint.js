var gulp = require('gulp'),
    jshintStylish = require('jshint-stylish'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('jshint', [], function() {
    'use strict';
    return gulp
        .src([
            './src/app/**/*.js'
        ])
        .pipe(g.cached('jshint'))
        .pipe(g.jshint('./.jshintrc'))
        .pipe(g.jshint.reporter(jshintStylish));
});

gulp.task('csslint', ['styles'], function() {
    'use strict';
    return gulp
        .src([
            './build/*.css'
        ])
        .pipe(g.cached('csslint'))
        .pipe(g.csslint('./.csslintrc'))
        .pipe(g.csslint.reporter());
});

gulp.task('lint', ['jshint', 'csslint']);
