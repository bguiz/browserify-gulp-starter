var gulp = require('gulp'),
    streamQueue = require('streamqueue'),
    mainBowerFiles = require('main-bower-files'),
    g = require('gulp-load-plugins')({lazy: true});

function filterFilesByExtension (files, extension) {
    'use strict';
  var regExp = new RegExp('\\.' + extension + '$');
  return files.filter(regExp.test.bind(regExp));
}

gulp.task('vendor', [], function() {
    'use strict';
    var files = mainBowerFiles();
    var jsFiles = filterFilesByExtension(files, 'js');
    var cssFiles = filterFilesByExtension(files, 'css');
    var q = new streamQueue({objectMode: true});
    if (jsFiles && jsFiles.length > 0) {
        q.queue(gulp
            .src(jsFiles)
            .pipe(g.concat('vendor.js'))
            .pipe(gulp.dest('./build/'))
            .pipe(g.uglify())
            .pipe(g.rename('vendor.min.js'))
            .pipe(gulp.dest('./build'))
        );
    }
    if (cssFiles && cssFiles.length > 0) {
        q.queue(gulp
            .src(cssFiles)
            .pipe(g.concat('vendor.css'))
            .pipe(gulp.dest('./build/'))
            .pipe(g.cssMinify())
            .pipe(g.rename('vendor.min.css'))
            .pipe(gulp.dest('./build'))
        );
    }
    return q.done();
});
