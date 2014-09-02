var gulp = require('gulp'),
    options = require('../../gulpoptions'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('dist-app-js', ['build'], function() {
    'use strict';

    var appFiles;
    if (options.isAngularApp) {
        appFiles = [
            './build/**/app.annotated.js',
            './build/**/templates-app.js'
        ];
    }
    else {
        appFiles = [
            './build/**/*.js',
            '!./build/**/vendor*.js'
        ];
    }

    return gulp
        .src(appFiles)
        .pipe(g.concat('app.concat.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(g.sourcemaps.init())
        .pipe(g.uglify())
        .pipe(g.rename('app.min.js'))
        .pipe(g.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('dist-app-css', ['build'], function() {
    'use strict';
    return gulp
        .src('./build/app.css')
        .pipe(g.sourcemaps.init())
        .pipe(g.minifyCss())
        .pipe(g.rename('app.min.css'))
        .pipe(g.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('dist-app', ['dist-app-js', 'dist-app-css'], function() {});

gulp.task('dist-vendor', ['dist-app'], function() {
    'use strict';
    var vendorFileList = [
        './build/vendor.min.js',
        './build/vendor.min.css',
        './build/vendor.min.js.map',
        './build/vendor.min.css.map'
    ];

    return gulp
        .src(vendorFileList)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('dist-index', ['dist-vendor'], function() {
    'use strict';
    var appFileList = [
        './dist/*.min.js',
        '!./dist/vendor.min.js',
        './dist/*.min.css',
        '!./dist/vendor.min.css'
    ];
    var appFiles = gulp.src(appFileList, { read: false });
    var vendorFileList = [
        './dist/vendor.min.js',
        './dist/vendor.min.css'
    ];
    var vendorFiles = gulp.src(vendorFileList, { read: false });

    return gulp
        .src(options.appFolder+'index.html')
        .pipe(g.inject(vendorFiles, {
            ignorePath: '/dist/',
            starttag: '<!-- inject:vendor:{{ext}} -->',
            addRootSlash: false,
        }))
        // //NOTE this should, but doesn't work, so falling back on the more explicit starttag option
        // .pipe(g.inject(vendorFiles, { ignorePath: '/dist', name: 'vendor' }))
        .pipe(g.inject(appFiles, {
            ignorePath: '/dist/',
            addRootSlash: false,
        }))
        .pipe(g.htmlmin(options.htmlMinOptions))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('dist', ['build', 'dist-app', 'dist-vendor', 'dist-index']);
