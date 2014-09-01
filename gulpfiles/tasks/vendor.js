var gulp = require('gulp'),
    eventStream = require('event-stream'),
    mainBowerFiles = require('main-bower-files'),
    g = require('gulp-load-plugins')({lazy: true});

function filterFilesByExtension (files, extension) {
    'use strict';
  var regExp = new RegExp('\\.' + extension + '$');
  return files.filter(regExp.test.bind(regExp));
}

gulp.task('vendor-html', [], function() {
    'use strict';
    if (global.isAngularApp) {
        return gulp
            .src('./bower_components/**/*.html')
            .pipe(g.htmlmin(global.htmlMinOptions))
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
            .pipe(g.concat('templates-vendor.js'))
            .pipe(gulp.dest('./build'));
    }
});

gulp.task('vendor-css', [], function() {
    'use strict';
    var files = mainBowerFiles();
    var cssFiles = filterFilesByExtension(files, 'css');
    var styleFiles = ['./bower_components/**/*.scss'];

    var vendorStyles, vendorCss;
    if (global.compileVendorStyles) {
        vendorStyles = gulp
            .src(styleFiles)
            .pipe(g.sass());
    }
    if (cssFiles && cssFiles.length > 0) {
        vendorCss = gulp.src(cssFiles);
    }
    var mergedStream;
    if (vendorStyles && vendorCss) {
        mergedStream = eventStream
            .merge(vendorStyles, vendorCss);
    }
    else if (vendorStyles || vendorCss) {
        mergedStream = vendorStyles || vendorCss;
    }
    if (mergedStream) {
        return mergedStream
            .pipe(g.concat('vendor.css'))
            .pipe(gulp.dest('./build/'))
            .pipe(g.minifyCss())
            .pipe(g.rename('vendor.min.css'))
            .pipe(gulp.dest('./build'));
    }
});

gulp.task('vendor-js', [], function() {
    'use strict';
    var files = mainBowerFiles();
    var jsFiles = filterFilesByExtension(files, 'js');
    console.log('vendor-js jsFiles', jsFiles);
    if (jsFiles && jsFiles.length > 0) {
        var stream = gulp
            .src(jsFiles);
        //TODO investigate if it is necessary to annotate vendor dependencies
        //Need to detect which of them need it
        // if (global.isAngularApp) {
            // stream = stream
                // .pipe(g.streamify(g.ngAnnotate()));
                // .pipe(g.rename('vendor.annotated.js'))
                // .pipe(gulp.dest('./build/'));
        // }
        stream = stream
            .pipe(g.concat('vendor.js'))
            .pipe(gulp.dest('./build/'))
            .pipe(g.uglify())
            .pipe(g.rename('vendor.min.js'))
            .pipe(gulp.dest('./build'));
        return stream;
    }
});

gulp.task('vendor', ['vendor-js', 'vendor-css', 'vendor-html']);
