var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('styles', [], function() {
    return gulp
        .src('./src/app/app.scss')
        .pipe(g.sass())
        .pipe(gulp.dest('./build/'))
        .pipe(g.cached('built-css'));
});
