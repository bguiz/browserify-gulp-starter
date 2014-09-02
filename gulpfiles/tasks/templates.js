var gulp = require('gulp'),
    options = require('../../gulpoptions'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('templates', [], function() {
    'use strict';
    var stream =  gulp
        .src([
            options.appFolder+'**/*.html',
            '!./src/app/index.html'
        ])
        .pipe(g.htmlmin(options.htmlMinOptions));
    if (options.isAngularApp) {
        stream = stream
            .pipe(g.ngHtml2js({
                moduleName: function(file) {
                    if (file.base && file.base.indexOf('bower_components') < 0) {
                        return options.appName;
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
