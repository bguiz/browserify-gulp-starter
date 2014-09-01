var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('templates', [], function() {
    'use strict';
    var stream =  gulp
        .src([
            './src/app/**/*.html',
            '!./src/app/index.html'
        ])
        .pipe(g.htmlmin(global.htmlMinOptions));
    if (global.isAngularApp) {
        stream = stream
            .pipe(g.ngHtml2js({
                moduleName: function(file) {
                    if (file.base && file.base.indexOf('bower_components') < 0) {
                        return 'app';
                    }
                    else {
                        return file.relative.split('/')[0];
                    }
                },
            }))
            .pipe(g.concat('templates-app.js'));
    }
    stream = stream
        .pipe(gulp.dest('./build'));
    return stream;
});
