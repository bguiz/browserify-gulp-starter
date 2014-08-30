var gulp = require('gulp'),
    rimraf = require('rimraf'),
    g = require('gulp-load-plugins')({lazy: true});

gulp.task('clean-build', [], function(done) {
  rimraf('./build', done);
});

gulp.task('clean-dist', [], function(done) {
  rimraf('./dist', done);
});

gulp.task('clean', ['clean-build', 'clean-dist']);
