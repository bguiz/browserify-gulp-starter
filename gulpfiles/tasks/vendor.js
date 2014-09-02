var gulp = require('gulp'),
    eventStream = require('event-stream'),
    mainBowerFiles = require('main-bower-files'),
    options = require('../../gulpoptions'),
    g = require('gulp-load-plugins')({lazy: true});

function filterFilesByExtension (files, extension) {
    'use strict';
  var regExp = new RegExp('\\.' + extension + '$');
  return files.filter(regExp.test.bind(regExp));
}

gulp.task('vendor-html', [], function() {
    'use strict';
    if (options.isAngularApp) {
        return gulp
            .src('./bower_components/**/*.html')
            .pipe(g.htmlmin(options.htmlMinOptions))
            .pipe(g.ngHtml2js({
                moduleName: function(file) {
                    console.log('vendor-html moduleName', file.base, file.relative);
                    if (file.base && file.base.indexOf('bower_components') < 0) {
                        return options.appName;
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
    console.log('vendor-css cssFiles', cssFiles);

    var vendorStyles, vendorCss;
    if (options.compileVendorStyles) {
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
            .pipe(g.sourcemaps.init())
            .pipe(g.minifyCss())
            .pipe(g.rename('vendor.min.css'))
            .pipe(g.sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    }
});

gulp.task('vendor-js', ['vendor-html'], function() {
    'use strict';
    var files = mainBowerFiles();
    var jsFiles = filterFilesByExtension(files, 'js');
    if (options.isAngularApp) {
        jsFiles.push('./build/templates-vendor.js');
    }
    // var templateFiles = ['./build/templates-vendor.js'];
    // console.log('vendor-js jsFiles', jsFiles);

    return gulp
        .src(jsFiles)
        .pipe(g.concat('vendor.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(g.sourcemaps.init())
        .pipe(g.uglify())
        .pipe(g.rename('vendor.min.js'))
        .pipe(g.sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));

    // var mergedStream, jsStream, templateStream;
    // if (jsFiles && jsFiles.length > 0) {
    //     jsStream = gulp
    //         .src(jsFiles);
    // }
    // else {
    //     jsStream = g.util.noop();
    // }
    // if (templateFiles && templateFiles.length > 0) {
    //     templateStream = gulp
    //         .src(templateFiles);
    // }
    // else {
    //     templateStream = g.util.noop();
    // }
    // mergedStream = eventStream
    //     .merge(jsStream, templateStream);
    // if (true) {
    //     var stream = mergedStream;
    //     //TODO investigate if it is necessary to annotate vendor dependencies
    //     //Need to detect which of them need it
    //     // if (options.isAngularApp) {
    //         // stream = stream
    //             // .pipe(g.streamify(g.ngAnnotate()));
    //             // .pipe(g.rename('vendor.annotated.js'))
    //             // .pipe(gulp.dest('./build/'));
    //     // }
    //     stream = stream
    //         .pipe(g.concat('vendor.js'))
    //         .pipe(gulp.dest('./build/'))
    //         .pipe(g.sourcemaps.init())
    //         .pipe(g.uglify())
    //         .pipe(g.rename('vendor.min.js'))
    //         .pipe(g.sourcemaps.write('./'))
    //         .pipe(gulp.dest('./build'));
    //     return stream;
    // }
});

gulp.task('vendor', ['vendor-js', 'vendor-css', 'vendor-html']);
