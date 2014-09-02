var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    options = require('../../gulpoptions'),
    g = require('gulp-load-plugins')({lazy: true});


gulp.task('browser-sync', ['build'], function() {
    'use strict';
    browserSync.init(['build/**'], {
        server: {
            baseDir: ['build']
        }
    });
});

gulp.task('browser-sync-dist', ['dist'], function() {
    'use strict';
    browserSync.init(['dist/**'], {
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('watch', ['set-watch-flag', 'browser-sync'], function() {
    'use strict';
    //TODO get a sass lint instead of css lint - more useful.
    //Unfortunately, this presently requires a ruby ge,m dependency
    //So we compile the sass files, and then run css lint on it
    gulp.watch(options.appFolder+'**/*.scss', ['styles', 'csslint']);
    gulp.watch(options.appFolder+'**/*.html', ['templates']);
    //NOTE no need to watch js and browserify is hooked up to watchify within the task
});

gulp.task('set-watch-flag', function() {
    'use strict';
    global.isWatching = true;
});

gulp.task('serve', ['watch']);
gulp.task('serve-dist', ['browser-sync-dist']);
